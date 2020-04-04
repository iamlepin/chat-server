const { users: validate } = require('../validators')
console.log('validate: ', validate);
const { sendError, sendResponse } = require('../api/utils/helpers')

const users = {
  add: (req, res) => {
    if (!validate.add(req.body)) {
      return sendError(res, validate.add.errors)
    }

    return sendResponse(res, 'some data')
  }
}

module.exports = users
