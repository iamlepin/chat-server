const app = require('./app');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socket = require('./api/socket.io');
const { server } = require('./config');

const PORT = process.env.PORT || server.PORT;

io.on('connection', socket.connect)

http.listen(PORT, console.log(`Listening port ${PORT} on ${server.PROTOCOL}://${server.URL}`));
