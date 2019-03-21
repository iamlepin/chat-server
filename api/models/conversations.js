const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // members: { type: Array, required: true },
  producerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  consumerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lastMessageId: { type: mongoose.Schema.Types.ObjectId },
  lastMessageDate: { type: Date }
})

module.exports = mongoose.model('Conversation', schema)
