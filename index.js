const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const _port = process.env.PORT;
server.listen( _port, () => {
    console.log('server start at: 8080')
});
