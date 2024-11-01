const mongoose = require('mongoose');

const providerSignupSchema = new mongoose.Schema({
    name: String,
    phone: String,
    companyCode: String,
    email: String,
    password: String,
    address: String,
    cnicFront: String, 
    cnicBack: String, 
    policeCertificate: String 
});

module.exports = mongoose.model('ProviderSignup', providerSignupSchema);