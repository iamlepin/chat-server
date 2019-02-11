const connect = (socket) => {
  console.log('socket connected')
  socket.on('chat message', (message) => {
    socket.emit('message', message)
  })
}

module.exports = {
  connect,
}
