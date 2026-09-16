const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../model/userModel");
const Holdings = require("../model/holdingsModel");
const Orders = require("../model/ordersModel");
const Positions = require("../model/positionsModel");

async function migrate() {
  const email = String(process.env.LEGACY_USER_EMAIL || "").trim().toLowerCase();
  if (!email) throw new Error("Set LEGACY_USER_EMAIL before running this migration");
  await mongoose.connect(process.env.MONGO_URL);

  const user = await User.findOne({ email });
  if (!user) throw new Error(`No user found for ${email}`);

  const filter = { user: { $exists: false } };
  const [holdings, orders, positions] = await Promise.all([
    Holdings.updateMany(filter, { $set: { user: user._id } }),
    Orders.updateMany(filter, { $set: { user: user._id } }),
    Positions.updateMany(filter, { $set: { user: user._id } }),
  ]);

  console.log(`Assigned legacy data to ${email}:`, {
    holdings: holdings.modifiedCount,
    orders: orders.modifiedCount,
    positions: positions.modifiedCount,
  });
}

migrate()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());