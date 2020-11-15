const authRouter = require('./auth/authRoute');
const farmRouter = require('./farms/farmRoute');
const poundRouter = require('./farms/pounsRoute');
const {auth} = require('../middlewares');
module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/farm', auth, farmRouter);
    app.use('/pound', auth, poundRouter);
    app.get('/', (req, res) => {
        res.json({
            message: "Welcome to cargill backEnd"
        })
    });
};
