
const { Pool } = require('pg')
const { DATABASE_URL } = require('./env')

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false
})

pool.on('connect', () => {
  console.log('PostgreSQL client connected')
})

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err)
})

module.exports = pool
