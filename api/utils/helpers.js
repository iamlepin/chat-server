const jwt = require('jsonwebtoken')

const signToken = (payload, expiresIn) => jwt.sign(
  payload,
  process.env.SECRET_PHRASE,
  { expiresIn: expiresIn || '1H' },
)


module.exports = {
  signToken,
}