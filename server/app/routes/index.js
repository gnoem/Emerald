const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
//const io = require('../middleware/io');
//const auth = require('../middleware/auth');
const User = require('../models/user');

module.exports = (app) => {
    app.post('/user/signup', [
        check('username')
            .not().isEmpty().withMessage('Please enter a valid username')
            .isAlphanumeric().withMessage('Your username may not contain any special characters')
            .isLength({ min: 2, max: 15 }).withMessage('Username must be between 2 and 15 characters')
            .custom(value => {
                return User.findOne({ username: value }).then(user => {
                    if (user) return Promise.reject('Username is already in use!');
                });
            }),
        check('password')
            .isLength({ min: 6 }).withMessage('Minimum is 6 characters')
    ], (req, res) => {
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
                accessToken: accessToken
            });
        })
    });
    app.post('/user/login', (req, res) => {
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
                userData: {
                    username: user.username,
                    avatar: user.avatar
                }
            });
        })
    });
    app.post('/edit/avatar', (req, res) => {
        console.dir(req.body);
    })
}