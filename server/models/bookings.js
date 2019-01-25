const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const person = require('./person');
const PersonSchema = person.PersonSchema;

const BookingSchema = new Schema({
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
        ac: Boolean,
    },
    driver: {
        firstName: String,
        lastName: String,
        gender: String,
        dateOfBirth: String,
        email: String,
        contact: Number,
    },
    status: String,
    booking: String,
    passengers: [PersonSchema],
    payment: Boolean,
    selection: Array,
    amount: Number,
    order_id: String
});

Booking = mongoose.model('booking', BookingSchema, 'bookings');
module.exports = {
    BookingSchema: BookingSchema,
    Booking: Booking
};