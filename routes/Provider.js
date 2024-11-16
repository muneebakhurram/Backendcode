const express = require('express');
const multer = require('multer');
const ProviderSignup = require('../models/providersignup');
const path = require('path');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const bcrypt = require('bcrypt');

const router = express.Router();


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Save files in the 'uploads' directory
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpg|jpeg|png|pdf/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb('Error: Only .jpg, .jpeg, .png images and .pdf files are allowed!');
    }
  });
  
  // Route to handle file upload and provider signup
  router.post('/signup', upload.fields([
    { name: 'cnicFront', maxCount: 1 },
    { name: 'cnicBack', maxCount: 1 },
    { name: 'policeCertificate', maxCount: 1 }
]), async (req, res) => {
    const { name, phone, companyCode, email, password, address } = req.body;
    const cnicFront = req.files['cnicFront'] ? `/uploads/cnicFront/${req.files['cnicFront'][0].filename}` : null;
    const cnicBack = req.files['cnicBack'] ? `/uploads/cnicBack/${req.files['cnicBack'][0].filename}` : null;
    const policeCertificate = req.files['policeCertificate'] ? `/uploads/policeCertificate/${req.files['policeCertificate'][0].filename}` : null;

    try {
        // Check if the email already exists in the database
        const existingProvider = await ProviderSignup.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ success: false, message: "Email is already registered." });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save provider info to the database
        const newProvider = new ProviderSignup({
            name,
            phone,
            companyCode,
            email,
            password: hashedPassword, // Store hashed password
            address,
            cnicFront,
            cnicBack,
            policeCertificate
        });

        await newProvider.save();
        res.status(201).json({ success: true, message: "Provider signup successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error signing up provider." });
    }
});
  


  router.post('/Providerlogin', async (req, res) => {
    const { email, password } = req.body;  // Fetching email and password from the request body
  
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
  
    try {
      // Find provider by email
      const provider = await ProviderSignup.findOne({ email });
      if (!provider) {
        return res.status(404).json({
          success: false,
          message: "Provider not found"
        });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, provider.password);
      if (!isMatch) {
        return res.status(403).json({
          success: false,
          message: "Invalid password"
        });
      }
  
      // Generate JWT token for the provider
      const token = jwt.sign(
        { providerId: provider._id, email: provider.email }, // Payload
        process.env.JWT_SECRET, // Secret key for signing the token
        { expiresIn: '1h' } // Token expiration time
      );
  
      // Send response with the token and provider info
      res.status(200).json({
        success: true,
        message: "Provider logged in successfully",
        data: {
          provider: {
            id: provider._id,
            name: provider.name,
            email: provider.email,
            phone: provider.phone,
            companyCode: provider.companyCode,
            address: provider.address,
            role: provider.role
          },
          token
        }
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  });
 

module.exports = router;