class User {
  constructor (models) {
    this.models = models
  }

  static init (models) {
    return new User(models)
  }

  add (userData) {
    return this.models.user.add(userData)
  }
}

module.exports = User
