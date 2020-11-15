const {schema, loginSchema} = require('./userValidator');
const {farmSchema, poundSchema} = require('./farmValidators');
module.exports = {
    userValidator: schema,
    loginValidator: loginSchema,
    farmValidator: farmSchema,
    poundValidator: poundSchema
};
