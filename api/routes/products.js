const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
  Product.find()
    .select('_id title price')
    .exec()
    .then(docs => {
      if (docs) {
        res.status(200).json({
          message: 'Products loaded',
          products: docs
        });
      } else {
        res.status(404).json({
          message: 'No products in this collection.'
        });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    price: req.body.price
  });
  product
    .save()
    .then(doc => {
      console.log(doc);
      res.status(201).json({
        message: 'Product created.',
        createdProduct: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .select('_id title price')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          message: 'Product loaded.',
          product: doc
        })
      } else {
        res.status(404).json({
          message: 'Unable to load product. No data for this id.'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.patch('/:productId', (req, res, next) => {
  console.log('patch', req.body)
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      $set: {
        title: req.body.title,
        price: req.body.price,
      }
    }
  )
    .select('_id title price')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          message: 'Product updated.',
          updatedProduct: doc,
          newProduct: req.body,
        })
      } else {
        res.status(404).json({
          message: 'Unable to patch product. No data for this id.'
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

router.delete('/:productId', (req, res, next) => {
  Product.findByIdAndRemove(req.params.productId)
    .select('_id title price')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          message: 'Product deleted',
          deletedProduct: doc
        })
      } else {
        res.status(404).json({
          message: 'Unable to delete product. No data for this id.'
        });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
