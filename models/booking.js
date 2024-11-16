const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    problemDescription: { type: String, required: true },
    estimatedCharges: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    serviceLevel: { type: String, required: true },
    image: { type: String, required: false }, // Optional, so required is set to false
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);
