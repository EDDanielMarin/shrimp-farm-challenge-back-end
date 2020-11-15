const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const _secret = process.env.JWT_TOKEN;
module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        return next(createError(401));
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decode = jwt.verify(token, _secret);
        req.user = {
            _id: decode._id,
            username: decode.username
        };
        next();
    } catch (e) {
        next(createError(401))
    }
};
