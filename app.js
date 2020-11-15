if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const createError = require('http-errors');

const {middleware} = require('./src/middlewares');
const routes = require('./src/routes');
const db = require('./src/configurations/db');

const app = express();
db(app);
middleware(app);
routes(app);
app.use((req, res, next) => {
    const error = createError(404);
    next(error);
});
app.use((error, req, res, next) => {
    res.statusCode = error.statusCode;
    res.json({status: 'error', message : error.message});
});
module.exports = app;

