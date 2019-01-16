const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    origin: String,
    destination: String,
    departure: String,
    arrival: String,
    type: String,
    agency: String,
    price: Number,
    vehicle: {
        model: String,
        plateNumber: String,
        ac: Boolean
    },
    driver: {
        firstName: String,
        lastName: String,
        gender: String,
        dateOfBirth: String,
        email: String,
        contact: Number
    }
})

module.exports = mongoose.model('order', OrderSchema,'orders');