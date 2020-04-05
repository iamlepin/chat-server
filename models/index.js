const models = {
  user: require('./user.js'),
}

class Model {
  constructor (db, models) {
    Object.entries(models)
      .map(([ name, Model ]) => this[name] = new Model(db))
  }

  static init (db, models) {
    return new Model(db, models)
  }
}

module.exports = {
  models,
  Model,
}
