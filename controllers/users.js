const { users: validate } = require('../validators')
const services = require('../services')
const { sendError, sendResponse } = require('../api/utils/helpers')

const users = {
  add: async (req, res) => {
      if (!validate.add(req.body)) {
        return sendError(res, validate.add.errors)
      }
      const newUser = await services.user.add(req.body)

      return sendResponse(res, newUser)
  },
  checkBy: async (req, res) => {
      if (!validate.checkBy(req.body)) {
        return sendError(res, validate.checkBy.errors)
      }
      const foundUsers = await services.user.checkBy(req.body)

      return sendResponse(res, foundUsers)
  }
}

module.exports = users
