const Pool = require('pg').Pool

const pool = new Pool({
  user: 'iamlepin',
  host: 'localhost',
  database: 'nodechat',
  password: 'iamlepin84',
  port: 5432,
})

class DB {
  constructor (queryInstance) {
    this.queryInstance = queryInstance
  }

  withTransaction (applyQuerySequence) {
    return async (req, res) => {
      const originalQueryInstance = this.queryInstance
      try {
        this.queryInstance = await originalQueryInstance.connect()
        await this.queryInstance.query('BEGIN')
        await applyQuerySequence(req, res)
        await this.queryInstance.query('COMMIT')

      } catch (error) {
        console.log('Transaction rollback.')
        console.error(error)
        this.queryInstance.query('ROLLBACK')

      } finally {
        this.queryInstance.release()
        this.queryInstance = originalQueryInstance
      }
    }
  }

  async getUsers (whereParams = {}, whereOperator = 'AND') {
    try {
      const whereKeys = Object.keys(whereParams).map((key, index) => `${key} = $${index + 1}`)
      const whereString = whereKeys.join(` ${whereOperator} `)
      const whereValues = Object.values(whereParams)

      const users = await this.queryInstance.query(
        `SELECT id, id_fb, user, email, user_pic FROM users WHERE ${whereString}`,
        whereValues,
      )

      return users
    } catch (error) {
      console.error(error)
      throw new Error('Get user failed.')
    }
  }

  async checkUserExistence ({ name, email }) {
    try {
      const foundUsers = await this.queryInstance.query(
        'SELECT * FROM users WHERE name = $1 OR email = $2',
        [ name, email ],
      )
      return foundUsers
    } catch (error) {
      console.error(error)
      throw new Error('Check user existence failed.')
    }
  }

  async addNewUser ({ name, email, password, user_pic }) {
    try {
      let newUserData = [ name, email, password, user_pic ]

      const newUser = await this.queryInstance.query(
        `INSERT INTO users (name, email, password, user_pic) VALUES ($1, $2, $3, $4) RETURNING id, name, email, user_pic`,
        newUserData
      )

      return newUser
    } catch (error) {
      console.error(error)
      throw new Error('Creation user failed.')
    }
  }
}

module.exports = new DB(pool)
