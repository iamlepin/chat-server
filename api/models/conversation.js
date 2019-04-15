const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  members: { type: Array, required: true },
  lastMessageId: { type: mongoose.Schema.Types.ObjectId },
  lastMessageDate: { type: Date },
  unreadsCount: { type: Number, required },
  messagesCount: { type: Number, required },
})

module.exports = mongoose.model('Conversation', schema)
