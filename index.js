// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectToMongo = require('./db'); // Ensure this file connects to your MongoDB
const authRoutes = require('./routes/Auth');
const bookingRoutes = require('./routes/Booking');
const providerRoutes = require('./routes/Provider'); 
const addServiceRoute = require('./routes/Addservice'); // Ensure the name matches your file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Check and create the 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads directory created');
}

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(uploadDir)); 

// Connect to MongoDB
connectToMongo();

// API Routes
app.use('/api/Auth', authRoutes);
app.use('/api/Booking', bookingRoutes);
app.use('/api/Provider', providerRoutes);
app.use('/api/Addservice', addServiceRoute); // Correct usage of addServiceRoute

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
