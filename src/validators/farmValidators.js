const Joi = require('joi-oid');
const farmSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    active: Joi.boolean().required()
});
const poundSchema = Joi.object().keys({
    name: Joi.string().min(5).required(),
    size: Joi.number().required(),
    depth: Joi.number().required(),
    active: Joi.boolean().required(),
    farm: Joi.objectId().required()

});
module.exports =  {
    poundSchema, farmSchema
};
