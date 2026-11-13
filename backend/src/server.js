
const app = require('./app')
const pool = require('./config/db')
const { PORT } = require('./config/env')

const startServer = async () => {
  try {
    // Verify PostgreSQL connectivity before starting the API
    await pool.query('SELECT 1')

    console.log('PostgreSQL database connection verified')

    const port = Number(PORT)

    const server = app.listen(port, () => {
      console.log(`
===================================================
Campus Connect Backend Server Running
Address: http://localhost:${port}
Environment: ${process.env.NODE_ENV || 'development'}
Time: ${new Date().toISOString()}
===================================================
      `)
    })

    server.on('error', (err) => {
      console.error('Server startup error:', err)
      process.exit(1)
    })

    const shutdown = async () => {
      console.log('Shutting down Campus Connect API...')

      server.close(async () => {
        await pool.end()
        console.log('Server and PostgreSQL pool closed')
        process.exit(0)
      })
    }

    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)

  } catch (err) {
    console.error('Unable to start Campus Connect API:', err.message)
    await pool.end()
    process.exit(1)
  }
}

startServer()
