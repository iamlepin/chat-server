const express = require('express')
const router = express.Router()
const users = require('./controllers/users')

router.get('/', users.getAll)
router.get('/:userId', users.getOne)
router.get('/check/name/:name', users.getName)
router.get('/check/email/:email', users.getEmail)
router.post('/signup', users.signUp)
router.post('/login', users.signIn)
router.post('/login-fb', users.signInFb)
router.delete('/:userId', users.remove)

module.exports = router
