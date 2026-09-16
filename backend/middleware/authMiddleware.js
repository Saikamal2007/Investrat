const jwt = require("jsonwebtoken");

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return process.env.JWT_SECRET;
}

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
}

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAge: Number(process.env.COOKIE_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000,
  });
}

function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    req.user = jwt.verify(token, getJwtSecret());
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}

module.exports = { getJwtSecret, signToken, setAuthCookie, requireAuth };