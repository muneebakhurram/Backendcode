const mongoose = require('mongoose');


const addServiceSchema = new mongoose.Schema({
    name: String, 
    estimatedCharges: Number, 
    type: String, 
   picture: String,
});


module.exports = mongoose.model('AddService', addServiceSchema);