const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const User = require('../models/user');

module.exports = {
    userSignup: (req, res) => {
        const { username, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            // todo error stuff
            return console.log('Errors in signup form!');
        }
        const newUser = new User({
            username: username,
            password: bcrypt.hashSync(password, 8)
        });
        newUser.save(err => {
            if (err) return console.error('Error saving this user', err);
            const accessToken = jwt.sign({ id: newUser.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.cookie('auth', accessToken, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000 // 1,000 hours
            });
            res.send({
                success: true,
                accessToken,
                user: newUser
            });
        })
    },
    userLogin: (req, res) => {
        const { username, password } = req.body;
        User.findOne({ username: username }, (err, user) => {
            if (err) return console.error('Error signing in', err);
            if (!user) return console.log('Username does not exist'); // todo better errors
            const passwordIsValid = () => {
                bcrypt.compareSync(password, user.password);
            }
            if (!passwordIsValid) return console.error('Invalid password');
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            // should I even do tokens?
            // I guess if I want to prevent user from logging in multiple times from the same machine
            res.cookie('auth', token, { httpOnly: true, secure: false, maxAge: 3600000 });
            res.send({
                success: true,
                accessToken: token,
                user: user
            });
        })
    },
    editAvatar: (req, res) => {
        const { _id, avatar } = req.body;
        User.findOne({ _id }, (err, user) => {
            if (err) return console.error('error finding user', err);
            if (!user) return console.log(`no user with the id ${_id}`);
            user.avatar = avatar;
            user.save(err => {
                if (err) return console.error('error saving user', err);
                res.send({
                    success: true,
                    user
                });
            });
        });
    }
}