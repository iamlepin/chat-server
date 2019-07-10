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
      try {
        const originalQueryInstance = this.queryInstance
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

  async getUserName (name) {
    try {
      await this
    } catch (error) {

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

  async addNewUser ({ name, email, password, user_pic}) {
    try {
      let newUserData = [ name, email, password ]

      if (user_pic) {
        newUserData = [ ...newUserData, user_pic ]
      }

      const newUser = await this.queryInstance.query(
        `INSERT INTO users (name, email, password, user_pic) VALUES ($1, $2, $3, $4) RETURNING (id, name, email)`,
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
