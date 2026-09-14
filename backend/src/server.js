const app = require('./app')
const { PORT } = require('./config/env')

const startServer = (portToTry) => {
  const server = app.listen(portToTry, () => {
    console.log(`
===================================================
🚀 Campus Connect Backend Server Running
📍 Address: http://localhost:${portToTry}
⚙️  Environment: ${process.env.NODE_ENV || 'development'}
📅 Time: ${new Date().toISOString()}
===================================================
    `)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${portToTry} in use, trying port ${portToTry + 1}...`)
      startServer(portToTry + 1)
    } else {
      console.error('❌ Server startup error:', err)
    }
  })
}

startServer(Number(PORT))
