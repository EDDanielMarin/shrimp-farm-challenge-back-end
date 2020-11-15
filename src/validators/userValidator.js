const Joi = require('joi-oid');
const schema = Joi.object().keys({
    username: Joi.string().min(3).required(),
    fullName: Joi.string().min(3).required(),
    password: Joi.string().min(3).required()
});
const loginSchema = Joi.object().keys({
    username: Joi.required(),
    password: Joi.required()
});
module.exports =  {
    schema, loginSchema
};
