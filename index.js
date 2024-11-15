// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectToMongo = require('./db'); // Import MongoDB connection
// Import routes
const bookingRoutes = require('./routes/Booking');
const providerRoutes = require('./routes/Provider');
const addServiceRoute = require('./routes/Addservice');
const addAuthUserRoute = require('./routes/Authuser.js');


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
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/uploads', express.static(uploadDir));

// Connect to MongoDB
connectToMongo(); // Ensure MongoDB is connected before starting the server

// API Routes
app.use('/api/Booking', bookingRoutes);
app.use('/api/Provider', providerRoutes);
app.use('/api/Addservice', addServiceRoute);
app.use('/api/Authuser', addAuthUserRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
