const { Pool } = require('pg')
const config = require('../config/db.js')

const db = {}

const query = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA pg_catalog;
  CREATE SCHEMA IF NOT EXISTS iamlepin;
  SET search_path TO iamlepin;
  DROP TABLE app_user;
  CREATE TABLE IF NOT EXISTS app_user (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    fb_id varchar,
    name varchar NOT NULL,
    email varchar NOT NULL,
    password varchar NOT NULL,
    refresh_token varchar,
    user_pic varchar
  );
`
const createTables = async (sql) => {
  db.pool = new Pool(config.pg)
  await db.pool.query(sql)
}

createTables(query)
  .then(() => {
    console.log('Database created.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('!!!ERROR!!! Not all tabe was created.')
    console.error(error)
    process.exit(0)
  })

