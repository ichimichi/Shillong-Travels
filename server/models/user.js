const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    dateOfBirth: String,
    phone: Number,
    email: String,
    password: String,
    cpassword: String
});

module.exports = mongoose.model('user', userSchema, 'users');