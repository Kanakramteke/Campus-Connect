
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env')
const pool = require('../config/db')

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    })
  }

  let decoded

  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    })
  }

  try {
    const result = await pool.query(
      'SELECT * FROM "User" WHERE id = $1',
      [decoded.userId]
    )

    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      })
    }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    req.user = null
    return next()
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    const result = await pool.query(
      'SELECT * FROM "User" WHERE id = $1',
      [decoded.userId]
    )

    req.user = result.rows[0] || null
    next()
  } catch (err) {
    // Invalid tokens are treated as unauthenticated.
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      req.user = null
      return next()
    }

    next(err)
  }
}

module.exports = {
  authenticateToken,
  optionalAuth
}
