// routes/Booking.js
const express = require('express');
const multer = require('multer');
const Booking = require('../models/booking'); // Ensure the path is correct to your Booking model
const path = require('path');
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Ensure the uploads directory exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only .jpg and .png images are allowed!');
    }
});

// Route for creating a new booking
router.post('/create', upload.single('image'), async (req, res) => {
    const { serviceName, problemDescription, estimatedCharges, date, time, serviceLevel } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null; // Store the relative path

    try {
        const newBooking = new Booking({
            serviceName,
            problemDescription,
            estimatedCharges,
            date,
            time,
            serviceLevel,
            image
        });
        await newBooking.save();
        res.status(201).json({ success: true, message: 'Booking created successfully!' });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create booking.' });
    }
});

// Route for fetching all bookings
router.get('/details', async (req, res) => {
    try {
        const bookings = await Booking.find(); // Fetch all bookings
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching booking details:', error.message);
        res.status(500).json({ message: 'Failed to fetch booking details' });
    }
});

module.exports = router;
