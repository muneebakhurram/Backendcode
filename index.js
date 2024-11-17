const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectToMongo = require('./db');
const authRoutes = require('./routes/Auth');
const bookingRoutes = require('./routes/Booking');
const providerRoutes = require('./routes/Provider'); 
const bookingrequestRoutes = require('./routes/BookingRequest'); 
//const serviceRoutes = require('./routes/Addservice');

const adminRoutes = require('./routes/Admin');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST'],
    credentials: true,
}));
//app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
connectToMongo();

// API Routes
app.use('/api/Auth', authRoutes);
app.use('/api/Booking', bookingRoutes);
app.use('/api/Provider', providerRoutes); 
app.use('/api/Admin', adminRoutes);
app.use('/api/BookingRequest', bookingrequestRoutes);
//app.use('/api/Addservice', serviceRoutes);






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
