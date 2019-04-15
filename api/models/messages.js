const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  conversationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  sendDate: { type: Date, required: true },
  receiveDate: { type: Date, required: true },
  readDate: { type: Date },
  body: { type: String, required: true },
})

module.exports = mongoose.model('Message', schema)
