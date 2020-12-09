const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model(
    'User',
    new Schema({
        //email: String,
        username: String,
        password: String,
        //isVerified: Boolean,
        avatar: {
            body: String,
            pattern: String,
            eyes: String,
            mouth: String,
            headAccessory: String
        },
        stats: {
            level: Number,
            XP: Number,
            coins: Number
        }
    }),
    'users'
);

module.exports = User;