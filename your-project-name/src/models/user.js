const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;