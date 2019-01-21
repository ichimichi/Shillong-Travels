const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const booking = require('./bookings');
const BookingSchema = booking.BookingSchema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    dateOfBirth: String,
    phone: Number,
    email: String,
    password: String,
    cpassword: String,
    bookings: [BookingSchema]
});

module.exports = mongoose.model('user', userSchema, 'users');