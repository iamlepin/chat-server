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

  async checkExistenceBy (field, value) {
    const { rows } = await this.pool.query(queries.user.getBy(field, value))

    return Boolean(rows[0])
  }

  async findBy (searchObject) {
    const whereClauseString = Object.entries(searchObject)
      .reduce((acc, [ field, value ]) => {
        acc.push(`${field}='${value}'`)
        return acc
      }, [])
      .join(' AND ')

      const { rows } = await this.pool.query(queries.user.findBy(whereClauseString))

      return rows
  }
}

module.exports = User
