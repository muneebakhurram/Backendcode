const express = require('express');
const multer = require('multer');
const AddService = require('../models/addservice'); 
const path = require('path');
const router = express.Router();


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
    limits: { fileSize: 10 * 1024 * 1024 }, 
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


router.post('/add', upload.single('picture'), async (req, res) => {
    const { name, estimatedCharges, type } = req.body;
    const picture = req.file ? req.file.path : null; 

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

module.exports = router;