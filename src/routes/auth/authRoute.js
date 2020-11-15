const {Router} = require('express');
const router = Router();
const { doLogin, saveUser } = require('../../controller');
router
    .post('/login', doLogin)
    .post('/signup', saveUser);
 module.exports = router;
