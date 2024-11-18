const bcrypt = require("bcryptjs");
const Users = require("../models/Users"); 
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (email, userName, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const verificationLink = `http://localhost:3000/login?token=${token}`;

  // Set up the transporter for sending the email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Created - Service on Tab',
    text: `Hello ${userName},\n\nYour account has been successfully created. Please click the link below to verify your email and log in:\n\n${verificationLink}\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const signUpController = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    // Validation for missing fields
    if (!name || !email || !password || !phoneNumber || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if user already exists in the database
    const existingProvider = await Users.findOne({ email });

    if (existingProvider) {
      return res.status(403).json({
        success: false,
        message: "User already exists. Please log in.",
      });
    }

    // Hash the password before saving the user to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new provider object and set verified as false initially
    const newProvider = new Users({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      verified: false, // Ensure the user is not verified initially
    });

    // Save the new provider to the database
    await newProvider.save();

    // Send the confirmation email to the provider
    await sendConfirmationEmail(email, name, newProvider._id);

    // Respond to the client with success message
    res.status(201).json({
      success: true,
      message: "Account created successfully. Please check your email to verify your account.",
    });

  } catch (e) {
    console.error("Error details: ", e);
    res.status(500).json({
      success: false,
      message: `Server error: ${e.message}`,
    });
  }
};

module.exports = signUpController;
