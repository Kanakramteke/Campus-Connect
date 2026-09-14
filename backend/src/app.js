const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const errorHandler = require('./middleware/errorHandler')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventRoutes')
const clubRoutes = require('./routes/clubRoutes')
const communityRoutes = require('./routes/communityRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()

// Security & Cors Middleware
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(cors())

// Body Parsers
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static Uploads Directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Campus Connect Express REST API is running',
    timestamp: new Date().toISOString()
  })
})

// Mount API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/clubs', clubRoutes)
app.use('/api/communities', communityRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/upload', uploadRoutes)

// Compatibility fallbacks for legacy/alternative path bindings
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/clubs', clubRoutes)
app.use('/api/v1/communities', communityRoutes)
app.use('/api/v1/notifications', notificationRoutes)
app.use('/api/v1/upload', uploadRoutes)

// Centralized Error Handling Middleware
app.use(errorHandler)

module.exports = app
