const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // console.log('mdlw', req.headers);
    const token = req.headers.authorization.split(' ')[1];
    // console.log('token', token);
    req.auth = jwt.verify(token, process.env.SECRET_PHRASE)
    // console.log('auth', req.auth);
    next()
  } catch (err) {
    res.status(500).json({
      message: 'Invalid token.'
    });
  }
};
