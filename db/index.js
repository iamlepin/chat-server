const { Pool, Client } = require('pg')
const config = require('../config/db.js')

const db = {}

db.pool = new Pool(config.pg)
db.pool.query('ALTER ROLE postgres SET search_path TO iamlepin;')
db.Client = Client

module.exports = db
