const jwt = require('jsonwebtoken')

const signToken = (payload, options) => jwt.sign(
  payload,
  process.env.SECRET_PHRASE,
  options,
)


module.exports = {
  signToken,
}