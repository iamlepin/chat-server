const express = require('express')
const router = express.Router()
const users = require('./controllers/users')

router.get('/', users.getUsers)
router.get('/:userId', users.getUser)
router.get('/check/name/:name', users.getUserName)
router.get('/check/email/:email', users.getUserEmail)
router.post('/signup', users.registerUser)
router.post('/login', users.loginUser)
router.delete('/:userId', users.deleteUser)

module.exports = router
