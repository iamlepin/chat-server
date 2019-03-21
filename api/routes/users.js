const express = require('express')
const router = express.Router()
const users = require('./controllers/users')

router.get('/', users.getAll)
router.get('/:id', users.getOne)
router.get('/check/name/:name', users.getName)
router.get('/check/email/:email', users.getEmail)
router.post('/signup', users.signUp)
router.post('/login', users.signIn)
router.post('/login-fb', users.signInFb)
router.delete('/:id', users.remove)
router.get('/:id/chats', users.getUserChats)
router.post('/token/refresh', users.refreshUserToken)

module.exports = router
