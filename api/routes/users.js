const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

router.get('/', (req, res, next) => {
  User.find()
    .select('-__v')
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Users loaded successfuly',
        users: docs,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/check/:name', (req, res, next) => {
  User.findOne({ name: req.params.name })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          message: 'Username exists.',
          isExist: true,
        })
      } else {
        res.status(200).json({
          message: 'Username doesn\'t exist',
          isExist: false,
        })
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.post('/login', (req, res, next) => {
  User.findOne({ name: req.body.name })
    .exec()
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: `Auth failed. User ${req.body.name} isn't registered.`
        });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(result => {
            if (result) {
              const token = jwt.sign({
                email: user.email,
                _id: user.id,
              },
                process.env.SECRET_PHRASE,
                {
                  expiresIn: '1H',
                }
              );
              res.status(201).json({
                message: `User ${user.name} is logged in.`,
                token: token,
              });
            } else {
              res.status(401).json({
                message: 'Auth failed. Passwords doesn\'t match'
              });
            };
          })
          .catch(err => {
            res.status(500).json(err);
          })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

router.post('/signup', (req, res, next) => {
  console.log('TCL: req.body', req.body);
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        res.status(409).json({
          message: "Email exists."
        });
      } else {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            })
            return newUser.save();
          })
          .then(doc => {
            console.log('TCL: doc._id', doc._id);
            res.status(201).json({
              message: 'User created successfuly',
              createdUser: {
                _id: doc._id,
                name: doc.name,
                email: doc.email,
              },
            });
          })
          .catch(err => {
            res.status(500).json(err);
          });
      };
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .select('_id email')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          message: 'User data loaded.',
          user: doc
        })
      } else {
        res.status(404).json({
          message: 'Unable to load user data. No data for this id.'
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

router.delete('/:userId', (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
    .select('_id email')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          message: 'User data deleted.',
          deletedUser: doc
        })
      } else {
        res.status(404).json({
          message: 'Unable to delete user data. No data for this id.'
        });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});


module.exports = router;
