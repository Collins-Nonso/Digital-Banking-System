const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, dob } = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      password: hashed
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};