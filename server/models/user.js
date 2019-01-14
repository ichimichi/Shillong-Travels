const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    gender:{
        type: String,
        required: [true, 'Gender is required']
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date Of Birth is required']
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    cpassword: {
        type: String,
        required: [true, 'Password is required']
    }
        
});

module.exports = mongoose.model('user', userSchema,'users');