const express = require('express')
const router = express.Router()
const users = require('./controllers/users')
const usersPG = require('./controllers/users.pg')
const uploadCloudinary = require('../middlewares/multer')

router.get('/', users.getAll)
router.get('/:id', users.getOne)
router.get('/check/name/:name', usersPG.getUsersByValues)  // users.getName) // TODO: Lepin > Refactor route to query string.
router.get('/check/email/:email', usersPG.getUsersByValues)  // users.getEmail) // TODO: Lepin > Refactor route to query string.
router.post('/signup', uploadCloudinary, usersPG.signUp) // users.signUp
router.post('/login', users.signIn)
router.post('/login-fb', users.signInFb)
router.delete('/:id', users.remove)
router.get('/:id/chats', users.getUserChats)
router.post('/token/refresh', users.refreshUserToken)

module.exports = router
