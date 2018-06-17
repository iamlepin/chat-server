const mongoose = require('mongoose');

const prouctSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  price: {type: Number, required: true},
});

module.exports = mongoose.model('Product', prouctSchema);
