const app = require('./app');
const fs = require('fs');
const path = require('path')

//sockets
const chat = require('./api/sockets/chat');

const options = {  // TODO: Lepin > only for dev!!!!
  key: fs.readFileSync(path.resolve('dev-cert/localhost.key')),
  cert: fs.readFileSync(path.resolve('dev-cert/localhost.cert'))
};

const https = require('https').createServer(options, app);
const io = require('socket.io')(https);
const { server } = require('./config');

const PORT = process.env.PORT || server.PORT;

//socket connections
io.of('/chat').on('connection', chat.connect)

https.listen(PORT, console.log(`Listening port ${PORT} on ${server.PROTOCOL}://${server.URL}`));
