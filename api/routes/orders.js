const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
  Order.find()
    .select('id productId product quantity totalPrice')
    .exec()
    .then(docs => {
      if (docs) {
        res.status(200).json({
          message: 'Order successfuly fetched.',
          ordersQuantity: docs.length,
          orders: docs,
        });
      } else {
        res.status(200).json({
          message: 'No orders found',
          orders: null,
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  Product.findById({_id: req.body.productId})
    .select('-__v')
    .exec()
    .then(doc => {
      const newOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: doc,
        quantity: req.body.quantity,
        // totalPrice: doc.price,
      });
      return newOrder.save();
    })
    .then(doc => {
      res.status(201).json({
        message: 'Order successfuly created.',
        createdOrder: {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          totalPrice: doc.product.price * doc.quantity,
        },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:orderId', (req, res, next) => {
  Order.findById({_id: req.params.orderId})
    .select('-__v')
    .exec()
    .then(doc => {
      if(doc){
        res.status(200).json({
          message: 'Order fetched successfuly.',
          order: doc,
          totalPrice: doc.product.price * doc.quantity,
        });
      } else {
        res.status(200).json({
          message: 'Order not found.',
        });
      };
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:orderId', (req, res, next) => {
  Order.findByIdAndRemove({_id: req.params.orderId})
    .exec()
    .then(doc => {
      if(doc){
        res.status(200).json({
          message: 'Order deleted successfuly.',
          deletedOrder: doc,
        });
      } else {
        res.status(200).json({
          message: 'Order not found.',
        });
      };
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
