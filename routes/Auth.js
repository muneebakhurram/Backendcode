// backend/routes/auth.js

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const ConsumerSignup = require("../models/User"); // Adjust path if needed
require("dotenv").config();

const router = express.Router();
router.use(cors());

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z]{3,15}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
const phoneRegex = /^\+92\d{10}$/;

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register route
router.post("/createuser", async (req, res) => {
  // Your existing registration code here
});

// Email verification
router.get("/verify/:id", async (req, res) => {
  // Your existing email verification code here
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email); // Debug statement

  try {
    const user = await ConsumerSignup.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }
    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: "Email not verified." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    res.status(200).json({ success: true, message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error); // Log error
    res.status(500).json({ success: false, message: "Login failed." });
  }
});

module.exports = router;
