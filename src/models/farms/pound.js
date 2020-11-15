const {Schema, model} = require('mongoose');
const PoundSchema = new Schema({
    name: {type: 'string', required: true},
    size: {type: 'number', required: true},
    depth: {type: 'number'},
    active: {type: 'boolean', default: true},
    farm: { type: Schema.Types.ObjectID, ref: 'Farm'},
    createAt: {type: 'string', default: Date.now},
}, {timestamps: true});

module.exports = model('Pound', PoundSchema);
