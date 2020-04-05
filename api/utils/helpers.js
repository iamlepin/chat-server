const jwt = require('jsonwebtoken')
const config = require('../../config')

exports.sendResponse = (res, data, status = 200) => {
  res.status(status).json({
    success: true,
    data,
  })
}

exports.sendError = (res, data, status = 404) => {
  let dataToSend = []
  if (typeof data === 'string') {
    dataToSend = [ data ]
  }
  if (Array.isArray(data) && data.every((obj) => obj && obj.message)) {
    dataToSend = data.map((obj) => obj.message)
  }
  if (Array.isArray(data) && data.every((str) => typeof str === 'string')) {
    dataToSend = data
  }
  res.status(status).json({
    success: false,
    messages: dataToSend,
  })
}

exports.sendErrorMessage = (res) => (err) => {
  console.log(err)
  res.status(500).json({
    success: false,
    message: err.message,
  })
}

exports.onError = (error) => {
  console.log('### UNHANDLED REJECTION ###: ', error);
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

const withNextOnCatch = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res)
  } catch (error) {
    next(error)
  }
}
exports.getRouters = (router, routes) => routes.reduce((router, route) => {
  router[route.method](route.url, withNextOnCatch(route.controller))
  return router
}, router)
