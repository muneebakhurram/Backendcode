const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/Users"); // Assuming you are using this model for users

const loginController = async (req, res) => {
  try {
    const { email, password  } = req.body;

   
    // Regular login (email/password)
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await Users.findOne({ email});

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (!user.verified) {
      return res.status(403).json({ success: false, message: "Please verify your email before logging in." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    // Generate JWT token for the session
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
       id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
    
      },
      token 
    });
    
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = loginController;
