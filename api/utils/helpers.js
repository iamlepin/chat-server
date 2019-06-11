const jwt = require('jsonwebtoken')
const config = require('../../config')

const sendErrorMessage = (res) => (err) => {
  console.log(err)
  res.status(500).json({
    message: err.message,
  })
}

const signToken = (payload = {}, options = {}) => jwt.sign(
  payload,
  process.env.SECRET_PHRASE,
  options,
)

const getTokens = (userData = {}) => {
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

const getAppURL = () => {
  const { PROTOCOL, URL, PORT } = config.server
  return `${PROTOCOL}://${URL}:${PORT}`
}

module.exports = {
  sendErrorMessage,
  signToken,
  getTokens,
}
