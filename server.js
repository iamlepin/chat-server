const http = require('http');
const app = require('./app');
const { server } = require('./config');

const PORT = process.env.PORT || server.PORT;

http.createServer(app).listen(PORT, console.log(`Listening port ${PORT} on ${server.PROTOCOL}://${server.URL}`));
