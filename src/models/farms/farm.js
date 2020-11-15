const {Schema, model} = require('mongoose');
const FarmSchema = new Schema({
    name: {type: 'string', required: true},
    active: {type: 'boolean', default: true},
    pounds : [ {
        type: Schema.Types.ObjectID,
        ref: 'Pound'
    }],
}, {timestamps: true});

module.exports = model('Farm', FarmSchema);
