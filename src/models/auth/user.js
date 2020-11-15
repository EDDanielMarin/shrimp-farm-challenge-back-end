const { Schema, model} = require('mongoose');
const UserSchema = new Schema({
    fullName: { type: 'string', required: true},
    username: { type: 'string', required: true},
    password: { type: 'string', required: true}
}, {timestamps: true});

module.exports = model('User', UserSchema);
