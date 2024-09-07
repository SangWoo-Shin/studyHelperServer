const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new mongoose.Schema ({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        requried: [true, 'Email is required']
    },
    name: {
        type: String,
        requried: [true, 'Name is required']
    },
    image: {
        type: String,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
