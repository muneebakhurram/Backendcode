const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    serviceName: String,
    problemDescription: String,
    estimatedCharges: String,
    date: String,
    time: String,
    serviceLevel: String,
    image: String // Store file path as a string
});

module.exports = mongoose.model('Booking', BookingSchema);