const express = require('express');
const multer = require('multer');
const Booking = require('../models/booking');
const path = require('path');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
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
        const fileTypes = /jpg|jpeg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only .jpg and .png images are allowed!');
    }
});

// Route to create a booking with file upload
router.post('/create', upload.single('image'), async (req, res) => {
    const { serviceName, problemDescription, estimatedCharges, date, time, serviceLevel } = req.body;
    const image = req.file ? req.file.path : null;

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

module.exports = router;
