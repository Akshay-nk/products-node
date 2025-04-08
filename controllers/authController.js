const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const tokens = generateTokens(user);
  res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
  res.json({ accessToken: tokens.accessToken });
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};