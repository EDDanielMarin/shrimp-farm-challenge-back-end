const {User} = require('../../models');
const {userValidator} = require('../../validators');
const { hashSync } = require('bcryptjs');
const createError = require('http-errors');
const _strongLength = process.env.HASH_LENGTH * 1;
module.exports.saveUser = async (req, res, next) => {
    const user = new User(req.body);
    const {error, value} = userValidator.validate(req.body);
    if (error) {
        return next(createError(400, error.details.map(x => x.message).toString()));
    }
    const prev = await User.findOne({username: user.username});
    if(prev) {
        return next(createError(400, 'Username already register'))
    }
    user.password = hashSync(user.password, _strongLength);
    user.save().then(x => {
        res.json(x);
    }).catch(() => {
        next(createError(500))
    })
};


