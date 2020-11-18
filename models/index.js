const modelsList = {
  user: require('./user.js'),
}

class Models {
  constructor (db, modelsList) {
    Object.entries(modelsList)
      .map(([ name, Model ]) => this[name] = new Model(db))
  }

  static init (db, modelsList) {
    return new Models(db, modelsList)
  }
}

module.exports = {
  modelsList,
  Models,
}
