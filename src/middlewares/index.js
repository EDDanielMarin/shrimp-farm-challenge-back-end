const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

module.exports = {
    middleware: (app) => {
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(cors())
    },
    auth: require('./auth')
};
