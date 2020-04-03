const jwt = require('jsonwebtoken')
const config = require('../../config')

exports.sendErrorMessage = (res) => (err) => {
  console.log(err)
  res.status(500).json({
    message: err.message,
  })
}

exports.signToken = (payload = {}, options = {}) => jwt.sign(
  payload,
  process.env.SECRET_PHRASE,
  options,
)

exports.getTokens = (userData = {}) => {
  const accessToken = signToken(userData, { expiresIn: 60 * 30 })
  const refreshToken = signToken(userData, { expiresIn: '30 days' })
  const expiresIn = Date.now() + (60 * 3 * 1000) //(60 * 30 * 1000)
  const tokenPair = {
    accessToken,
    refreshToken,
    expiresIn,
  }
  return tokenPair ? tokenPair : {}
}

exports.getAppURL = () => {
  const { PROTOCOL, URL, PORT } = config.server
  return `${PROTOCOL}://${URL}:${PORT}`
}

exports.getRouters = (router, routes) => routes.reduce((router, route) => {
  router[route.method](route.url, route.controller)
  return router
}, router)
