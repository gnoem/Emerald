const controller = require('../controllers');
const { validate } = require('../middleware');

module.exports = (app) => {
    app.post('/user/signup', validate.userSignup, controller.userSignup);
    app.post('/user/login', controller.userLogin);
    app.post('/edit/avatar', controller.editAvatar);
}