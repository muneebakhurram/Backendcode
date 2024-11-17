const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Ensure your .env file has MONGO_URI defined
        await mongoose.connect(mongoURI); // No options needed
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectToMongo; // Export the function
