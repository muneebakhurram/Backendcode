const express = require('express');
const multer = require('multer');
const path = require('path');
const AddService = require('../models/addservice');
const router = express.Router();


// Configure multer for file uploads
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
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only .jpg, .jpeg, .png images are allowed!');
    }
});

// Route to add a new service
router.post('/add', upload.single('picture'), async (req, res) => {
    const { name, estimatedCharges, type } = req.body;
    
    const picture = req.file ? `uploads/${req.file.filename}` : null;

    try {
        const newService = new AddService({
            name,
            estimatedCharges,
            type,
            picture
        });

        await newService.save();
        res.status(201).json({ success: true, message: 'Service added successfully!' });
    } catch (error) {
        console.error('Error adding service:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add service.' });
    }
});
// Route to get all services
router.get('/all', async (req, res) => {
    try {
        const services = await AddService.find(); // Fetch all services from the DB
        res.status(200).json({ success: true, services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch services.' });
    }
});


module.exports = router;
