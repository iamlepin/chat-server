const User = require('../../models/users');

const getUsers = (req, res) => {
  User.find()
    .select('-__v')
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'Users loaded successfully',
        users: docs,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = {
  getUsers,
}
