const queries = require('./queries')

class User {
  constructor (db) {
    this.pool = db.pool
    this.Client = db.Client
  }

  async add (userData) {
    const { rows } = await this.pool.query(queries.user.add(userData))
    return rows[0]
  }
}

module.exports = User
