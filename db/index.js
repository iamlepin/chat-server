const { Pool, Client } = require('pg')
const config = require('../config/db.js')

const db = {}

const connectDb = async () => {
  db.pool = new Pool(config.pg)
  await db.pool.query('SET search_path TO iamlepin')
  db.Client = Client

}

try {
  connectDb()
  console.log('Database connected.')
} catch (error) {
  console.error('!!!ERROR!!! Can\'t connect to database.')
  console.error(error)
  process.exit(0)
}

module.exports = db
