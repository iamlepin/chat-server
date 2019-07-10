const mongoose = require('mongoose')
const User = require('../../models/user')
const Conversation = require('../../models/conversation')
const bcrypt = require('bcrypt')
const { sendErrorMessage, getTokens } = require('../../utils/helpers')
const R = require('ramda')
const db = require('../../db')

const getName = (req, res) => {

  User.findOne({ name: req.params.name })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          error: true,
          message: 'User name exists.',
        })
      } else {
        res.status(200).json({
          message: 'User name doesn\'t exist',
        })
      }
    })
    .catch(sendErrorMessage(res))
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
    .catch(sendErrorMessage(res))
}

const signUp = async (req, res) => {
  try {
  // TODO: Validate data and return human readable messages.
  // Search for user name or email existence.
  const foundUsers = await db.checkUserExistence({
    name: req.body.name,
    email: req.body.email,
  })

  if (foundUsers.rowCount > 0) {
    const takenRegistrationData = foundUsers.rows.reduce((acc, row) => {
      const data = Object.entries(row)
        .filter(([ key, value ]) => value === req.body.name || value === req.body.email)
        .reduce((acc, data) => ({ ...acc, [data[0]]: data[1] }), {})

      return { ...acc, ...data }
    }, {})

    res.status(200).json({
      error: 'That registration data already taken.',
      data: takenRegistrationData,
    })
  }

  const hash = await bcrypt.hash(req.body.password, 10)

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    user_pic: req.file && req.file.secure_url
  }

  const newUser = await db.addNewUser(newUserData)

  console.log("TCL: newUser", newUser)
  if (newUser) {
    res.status(201).json({
      message: 'User created successfully',
      createdUser: {
        ...newUser.rows[0], // TODO: Lepin > Returns concatenated string from columns values. Find how to parse to object.
        // name: req.body.name,
        // email: req.body.email,
      },
    })
  }
  } catch (error) {
    sendErrorMessage(res)(error)
  }
}

module.exports = {
  getName,
  getEmail,
  signUp: db.withTransaction(signUp),
}
