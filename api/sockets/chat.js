const mongoose = require('mongoose')
const Conversation = require('../models/conversations')
const Message = require('../models/messages')

let clients = 0

const connect = (socket) => {
  clients = clients + 1
  console.log('socket connected! clients = ', clients)

  socket.on('disconnect', (msg) => {
    console.log(msg)
  })

  socket.on('chat_message', async (message) => {
    try {
      const postedMessage = await new Message({
        _id: new mongoose.Types.ObjectId(),
        conversationId: message.conversationId,
        author: message.author,
        sendDate: message.sendDate,
        receiveDate: new Date().toISOString(),
        readDate: null,
        body: message.body,
      }).save()
      socket.broadcast.emit('chat_message', postedMessage)
      socket.emit('post_message', {
        tmpId: message.tmpId,
        message: postedMessage,
      })
    } catch (error) {
			console.log('TCL: }catch -> error', error)
      socket.emit('error', {
        error,
        message: 'Message not saved!',
      })
      socket.emit('chat_message_error', { messageId: message._id })
    }
  })

  socket.on('init_conversation', async ({ userId, companionId }) => {
    try {
      let messages = []
      let conversation = await Conversation.findOne({ members: { $all: [ userId, companionId ] } }).exec()

      if (!conversation) {
        conversation = await new Conversation({
          _id: new mongoose.Types.ObjectId(),
          members: [ userId, companionId ],
        }).save()
      } else {
        messages = await Message.find({ conversationId: conversation._id })
      }

      socket.emit('init_conversation', {
        conversation,
        messages,
      })
    } catch (error) {
      socket.emit('error', {
        error,
        message: 'Get conversation error.',
      })
    }
  })
}

module.exports = {
  connect,
}
