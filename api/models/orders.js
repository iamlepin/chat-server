const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {type: Object, required: true, ref: 'Product'},
  quantity: {type: Number, default: 1},
  // totalPrice: {type: Number, required: true},
});

module.exports = mongoose.model('Order', orderSchema);
