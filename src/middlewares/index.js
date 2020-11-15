const morgan = require('morgan');
const express = require('express');

module.exports = {
    middleware: (app) => {
        app.use(morgan('dev'));
        app.use(express.json())
    },
    auth: require('./auth')
};
