const mongoose = require('mongoose')
const User = require('../../models/users')
const bcrypt = require('bcrypt')
const { signToken } = require('../../utils/helpers')

const getAll = (req, res) => {
  User.find()
    .select('-__v')
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Users loaded successfully',
        users: docs,
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const getOne = (req, res) => {
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
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

const getName = (req, res) => {
  User.findOne({ name: req.params.name })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          error: true,
          message: 'Username exists.',
        })
      } else {
        res.status(200).json({
          message: 'Username doesn\'t exist',
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const getEmail = (req, res) => {
  User.findOne({ email: req.params.email })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          error: true,
          message: 'Email already registered.',
        })
      } else {
        res.status(200).json({
          message: 'Email available for registration.',
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const signUp = (req, res) => {
  console.log('TCL: req.body', req.body)
  const name = User.findOne({ name: req.body.name })
    .select('name')
    .exec()

  const email = User.findOne({ email: req.body.email })
    .select('email')
    .exec()

  Promise.all([name, email])
    .then(result => {
      const isFound = result.some((item) => item !== null)
      if (isFound) {
        const data = {}
        if (result[0]) { data.name = result[0].name }
        if (result[1]) { data.email = result[1].email }
        res.status(200).json({
          error: true,
          message: 'That registration data already taken.',
          data,
        })
      } else {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            })
            return newUser.save()
          })
          .then(user => {
            console.log('TCL: doc._id', user._id)
            res.status(201).json({
              message: 'User created successfully',
              createdUser: {
                _id: user._id,
                name: user.name,
                email: user.email,
              },
            })
          })
          .catch(err => {
            res.status(500).json(err)
          })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const signIn = (req, res) => {
  User.findOne({ name: req.body.name })
    .exec()
    .then(user => {
      if (!user) {
        res.status(401).json({
          error: true,
          message: `Auth failed. User ${req.body.name} isn't registered.`
        })
      } else {
        const isPassCompareSucces = bcrypt.compare(req.body.password, user.password)
        return { user, isPassCompareSucces }
      }
    })
    .then(({ user, isPassCompareSucces }) => {
      if (isPassCompareSucces) {
        const userData = {
          userId: user.id,
          userName: user.name,
          userRole: null,
        }
        const accessToken = signToken(userData, { expiresIn: 60 * 30 })
        const refreshToken = signToken(userData, { expiresIn: '30 days' })

        User.updateOne({ _id: user.id }, { refreshToken })
          .then(updatedUser => {
            if (updatedUser) {

              res.status(201).json({
                message: `User ${user.name} is logged in.`,
                data: {
                  ...userData,
                  accessToken,
                  expiresIn: Math.floor(Date.now() / 1000) + (60 * 30),
                  refreshToken,
                }
              })
            }
          })
      } else {
        res.status(401).json({
          error: true,
          message: 'Auth failed. Passwords doesn\'t match'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const signInFb = (req, res) => {
  User.findOne({ id_user_fb: req.body.id })
    .exec()
    .then(user => {
      if(user) {
        const accessToken = signToken({
          id: user.id,
          name: user.name,
        })
        res.status(200).json({
          message: `User ${user.name} is logged in.`,
          data: {
            id: user.id,
            name: user.name,
            accessToken,
            expiresIn: 'mock', // TODO: reserch expires in
          },
        })
      } else {
        // TODO: create user
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

const remove = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .select('_id email')
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          message: 'User data deleted.',
          deletedUser: user
        })
      } else {
        res.status(404).json({
          message: 'Unable to delete user data. No data for this id.'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

module.exports = {
  getAll,
  getOne,
  getName,
  getEmail,
  signUp,
  signIn,
  signInFb,
  remove,
}
