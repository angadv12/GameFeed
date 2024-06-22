const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a valid name']
    },
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
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
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema) // Export the model with the schema