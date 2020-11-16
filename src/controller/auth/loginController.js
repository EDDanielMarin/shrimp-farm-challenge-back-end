const jwt = require('jsonwebtoken');
const {User} = require('../../models');
const {loginValidator} = require('../../validators');
const { compareSync } = require('bcryptjs');

const createError = require('http-errors');

const _secret = process.env.JWT_TOKEN;
module.exports.doLogin = async (req, res, next) => {
    const {error, value} = loginValidator.validate(req.body);
    if (error) {
        return next(createError(400, error.details.map(x => x.message).toString()));
    }
    const user = await User.findOne({username: req.body.username});
    if(user && compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
            ...user
        }, _secret, {
            expiresIn: '2h'
        });
        await res.json({
            user,
            token
        })
    } else {
        return next(createError(405, 'Please enter valid credentials'))
    }

};
