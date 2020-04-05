const { Pool, Client } = require('pg')
const config = require('../config/db.js')

const db = {}
db.pool = new Pool(config.pg)
db.pool.query('SET search_path TO chat')
db.Client = Client

// class Db {
//   constructor (db) {
//     this.pool = db.pool
//     this.pool = db.Client
//   }

//   static init (db) {
//     return new Db(db)
//   }
// }

module.exports = db
