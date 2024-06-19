const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a valid name']
    },
    email: {
        type: String,
        required: [true, 'Please add a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],

    },
    profilePicture: {
        type: String,
        required: false,
        default: '../assets/pfpPlaceholder.png'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema) // Export the model with the schema