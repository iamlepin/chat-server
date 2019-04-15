const mongoose = require('mongoose')
const Conversation = require('../models/conversation')
const Message = require('../models/messages')

let clients = 0

const postMessage = (msgData) => new Message({
  _id: new mongoose.Types.ObjectId(),
  conversationId: msgData.conversationId,
  author: msgData.author,
  sendDate: msgData.sendDate,
  receiveDate: new Date().toISOString(),
  readDate: null,
  body: msgData.body,
}).save()

const connect = (socket) => {
  clients = clients + 1
  console.log('socket connected! clients = ', clients)

  socket.on('disconnect', (userId) => {
    console.log(userId + ' disconnected')
  })

  socket.on('chat_message', async (message) => {
    try {
      const postedMessage = await postMessage(message)
      socket.broadcast.emit('chat_message', postedMessage)
      socket.emit('post_message', {
        tempId: message.tempId,
        message: postedMessage,
      })
    } catch (error) {
			console.log('TCL: }catch -> error', error)
      socket.emit('error', {
        error,
        message: 'Message not saved!',
      })
      socket.emit('chat_message_error', { messageId: message._id }) // for repeating post message request
    }
  })

  socket.on('get_conversation', async ({ userId, companionId }) => {
    try {
      const response = {}
      let conversation = await Conversation.findOne({ members: { $all: [ userId, companionId ] } }).exec()

      if (conversation) {
        response.conversation = conversation
        response.messages = await Message.find({ conversationId: conversation._id })
      }

      if (!conversation) {
        response.conversation = await new Conversation({
          _id: new mongoose.Types.ObjectId(),
          members: [ userId, companionId ],
          unreadsCount: 0,
          messagesCount: 0,
        }).save()
        response.messages = []
      }

      socket.emit('get_conversation_response', response)
    } catch (error) {
      socket.emit('error', {
        error,
        message: 'Get conversation error.',
      })
    }
  })

  // socket.on('init_conversation', async ({ userId, companionId, message }) => {
  //   try {
  //     const conversation = await new Conversation({
  //       _id: new mongoose.Types.ObjectId(),
  //       members: [ userId, companionId ],
  //       unreadsCount: 0,
  //       messagesCount: 0,
  //     }).save()

  //     const postedMessage = await postMessage(message)

  //     socket.emit('init_conversation_response', {
  //       conversation,
  //       messages: [ postedMessage ],
  //     })

  //   } catch (error) {
	// 		console.log("TCL: error", error)
  //     socket.emit('error', {
  //       error,
  //       message: 'Init conversation error.',
  //     })
  //   }

  // })
}

module.exports = {
  connect,
}
