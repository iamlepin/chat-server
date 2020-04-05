const { users: validate } = require('../validators')
const services = require('../services')
const { sendError, sendResponse } = require('../api/utils/helpers')

const users = {
  add: async (req, res, next) => {
      if (!validate.add(req.body)) {
        return sendError(res, validate.add.errors)
      }
      const newUser = await services.user.add(req.body)

      return sendResponse(res, newUser)
  }
}

module.exports = users
