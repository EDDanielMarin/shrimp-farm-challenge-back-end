const { doLogin } = require('./auth/loginController');
const { saveUser } = require('./auth/signupController');
module.exports = {
    doLogin,
    saveUser,
    farmController: require('./farms/farmController'),
    poundController: require('./farms/poundController')
};
