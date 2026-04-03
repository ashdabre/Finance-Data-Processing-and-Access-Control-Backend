require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = getUserByUsername(username);
  if(!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

// REGISTER
router.post("/", (req, res) => {
  const { username, password, role } = req.body;
  try {
    createUser(username, password, role);
    res.json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "User exists or invalid input" });
  }
});

module.exports = router;