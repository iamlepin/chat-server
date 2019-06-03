const mongoose = require('mongoose')
const Conversation = require('../models/conversation')
const User = require('../models/user')
const Message = require('../models/message')

let clientsCounter = 0

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
  clientsCounter = clientsCounter + 1
  console.log('socket connected! clientsCounter = ', clientsCounter)
  socket.emit('connected', socket.id)

  socket.on('disconnect', (userId) => {
    clientsCounter = clientsCounter - 1
    console.log(userId + ' disconnected')
    console.log('Clients left: ', clientsCounter)
  })

  socket.on('chat_message', async (message, onPostMsgSuccess) => {
    try {
      const postedMessage = await postMessage(message)
      socket.to(message.conversationId).emit('chat_message', postedMessage)
      onPostMsgSuccess({
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
    console.log('userId: ', userId);
    try {
      if (!userId) { throw new Error('Expected userId to be a string.')}
      if (!companionId) { throw new Error('Expected companionId to be a string')}

      const user = await User.findOne({ _id: userId }).exec()
      if (!user) { throw new Error('User with userId does not exist.')}

      const companion = await User.findOne({ _id: companionId }).exec()
      if (!companion) { throw new Error('User with companionId does not exist.')}

      const response = {}
      let conversation = await Conversation.findOne({ members: { $all: [ userId, companionId ] } }).select('-__v').exec()

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

      socket.join(conversation._id)
      socket.emit('get_conversation_response', response)
    } catch (error) {
      console.log(error)
      socket.emit('get_conversation_error', {
        message: `${error.name}: ${error.message}`,
      })
    }
  })
}

module.exports = {
  connect,
}
