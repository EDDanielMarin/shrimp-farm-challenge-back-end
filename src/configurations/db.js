const mongoose = require('mongoose');
const _uri = process.env.MONGODB_URI;
module.exports = () => {
    mongoose.connect(_uri,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(db => console.log('Database is connected'))
        .catch(err => console.error(err));
};


