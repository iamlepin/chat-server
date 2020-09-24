const router = require('express').Router()
const { getRouters } = require('../api/utils/helpers')
const users = require('../api/routes/controllers/users')
const users2 = require('../controllers/users')
const { pipe } = require('ramda')
const uploadCloudinary = require('../api/middlewares/multer')
const argsLogger = require('../api/middlewares/argsLogger')

const userRoutes = [
  {
    method: 'get',
    url: '/',
    controller: users.getAll,
  },
  {
    method: 'get',
    url: '/:id',
    controller: users.getOne,
  },
  {
    method: 'get',
    url: '/check/name/:name',
    controller: pipe(argsLogger, users.getName),
  },
  {
    method: 'get',
    url: '/check/email/:email',
    controller: users.getEmail,
  },
  {
    method: 'post',
    url: '/checkBy',
    controller: users2.checkBy,
  },
  {
    method: 'post',
    url: '/add',
    controller: users2.add,
    // controller: pipe(uploadCloudinary, users.signUp),
  },
  {
    method: 'post',
    url: '/login',
    controller: users.signIn,
  },
  {
    method: 'post',
    url: '/login-fb',
    controller: users.signInFb,
  },
  {
    method: 'delete',
    url: '/:id',
    controller: users.remove,
  },
  {
    method: 'get',
    url: '/:id/chats',
    controller: users.getUserChats,
  },
  {
    method: 'post',
    url: '/token/refresh',
    controller: users.refreshUserToken,
  },
]

module.exports = getRouters(router, userRoutes)
