const { Models, modelsList } = require('../models')
const db = require('../db')
const model = Models.init(db, modelsList)

const servicesList = {
  user: require('./user')
}

class Services {
  constructor (services, model) {
    Object.entries(services)
      .map(([ name, Service ]) => this[name] = new Service(model))
  }

  static init (services, models) {
    return new Services(services, models)
  }
}

module.exports = Services.init(servicesList, model)
