const express = require("express");
const mongoose = require("mongoose");
const Holdings = require("./model/holdingsModel");
const Orders = require("./model/ordersModel");
const Positions = require("./model/positionsModel");
const User = require("./model/userModel");
const { signToken, setAuthCookie, requireAuth } = require("./middleware/authMiddleware");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000,http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

function publicUser(user) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
}

app.post("/auth/register", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const username = String(req.body.username || "").trim();
    const password = String(req.body.password || "");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "A valid email is required" });
    }
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      return res.status(400).json({ message: "Username must be 3-30 characters" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "Email or username is already registered" });
    }

    const user = await User.create({ email, username, password });
    setAuthCookie(res, signToken(user));
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create user" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const identifier = String(req.body.identifier || req.body.email || "").trim();
    const password = String(req.body.password || "");
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    setAuthCookie(res, signToken(user));
    res.json({ user: publicUser(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not log in" });
  }
});

app.get("/auth/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub);
  if (!user) return res.status(401).json({ message: "User not found" });
  res.json({ user: publicUser(user) });
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
  });
  res.json({ message: "Logged out" });
});

function formatPct(avg, price) {
  if (!avg) return "0.00%";
  const pct = ((price - avg) / avg) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
}

async function applyHoldingChange({ userId, name, qty, price, mode }) {
  let holding = await Holdings.findOne({ user: userId, name });

  if (mode === "BUY") {
    if (!holding) {
      holding = new Holdings({
        user: userId,
        name,
        qty,
        avg: price,
        price,
        net: "0.00%",
        day: "0.00%",
      });
    } else {
      const newQty = holding.qty + qty;
      holding.avg = (holding.avg * holding.qty + price * qty) / newQty;
      holding.qty = newQty;
      holding.price = price;
    }
    holding.net = formatPct(holding.avg, holding.price);
    await holding.save();
    return holding;
  }

  holding.qty -= qty;
  holding.price = price;
  if (holding.qty <= 0) {
    await Holdings.deleteOne({ _id: holding._id });
    return null;
  }
  holding.net = formatPct(holding.avg, holding.price);
  await holding.save();
  return holding;
}

async function applyPositionChange({ userId, name, qty, price, mode }) {
  const signedQty = mode === "BUY" ? qty : -qty;
  let position = await Positions.findOne({ user: userId, name });

  if (!position) {
    const isLoss = mode === "SELL";
    position = new Positions({
      user: userId,
      product: "CNC",
      name,
      qty: signedQty,
      avg: price,
      price,
      net: "0.00%",
      day: "0.00%",
      isLoss,
    });
    await position.save();
    return position;
  }

  const oldQty = position.qty;
  const newQty = oldQty + signedQty;

  if (newQty === 0) {
    await Positions.deleteOne({ _id: position._id });
    return null;
  }

  const sameDirection = oldQty * signedQty > 0;
  if (sameDirection) {
    position.avg =
      (Math.abs(oldQty) * position.avg + qty * price) / Math.abs(newQty);
  } else if (Math.abs(signedQty) > Math.abs(oldQty)) {
    position.avg = price;
  }

  position.qty = newQty;
  position.price = price;
  const pnl = (position.price - position.avg) * position.qty;
  position.isLoss = pnl < 0;
  position.net = formatPct(position.avg, position.price);
  await position.save();
  return position;
}

app.get("/allHoldings", requireAuth, async (req, res) => {
  const allHoldings = await Holdings.find({ user: req.user.sub });
  res.json(allHoldings);
});

app.get("/allPositions", requireAuth, async (req, res) => {
  const allPositions = await Positions.find({ user: req.user.sub });
  const lossPositions = allPositions.filter(
    (position) => (position.price - position.avg) * position.qty < 0,
  );
  res.json(lossPositions);
});

app.get("/allOrders", requireAuth, async (req, res) => {
  const allOrders = await Orders.find({ user: req.user.sub });
  res.json(allOrders);
});

app.post("/newOrder", requireAuth, async (req, res) => {
  try {
    const name = req.body.name;
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);
    const mode = String(req.body.mode || "").toUpperCase();

    if (
      !name ||
      !qty ||
      qty <= 0 ||
      Number.isNaN(price) ||
      price < 0 ||
      !["BUY", "SELL"].includes(mode)
    ) {
      return res.status(400).json({ message: "Invalid order details" });
    }

    if (mode === "SELL") {
      const holding = await Holdings.findOne({ user: req.user.sub, name });
      if (!holding || holding.qty < qty) {
        return res.status(400).json({
          message: `Not enough holdings to sell. Available: ${holding ? holding.qty : 0}`,
        });
      }
    }

    const newOrder = new Orders({ user: req.user.sub, name, qty, price, mode });
    await newOrder.save();

    const holding = await applyHoldingChange({ userId: req.user.sub, name, qty, price, mode });
    const position = await applyPositionChange({ userId: req.user.sub, name, qty, price, mode });

    res.json({ message: "Order saved!", order: newOrder, holding, position });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not place order" });
  }
});

async function startServer() {
  if (!url) throw new Error("MONGO_URL is not configured");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");

  await mongoose.connect(url);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("DB connected");
  });
}

startServer().catch((error) => {
  console.error("Could not start server", error);
  process.exit(1);
});
