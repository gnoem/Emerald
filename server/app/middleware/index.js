const { check } = require('express-validator');

const validate = {
    userSignup: [
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
    ]
}

module.exports = { validate }