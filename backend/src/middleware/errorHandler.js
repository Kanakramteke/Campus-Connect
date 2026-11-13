
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal server error'

  // Zod validation errors
  if (err.name === 'ZodError') {
    statusCode = 400
    message = 'Validation failed'

    return res.status(statusCode).json({
      success: false,
      message,
      errors: err.issues || err.errors
    })
  }

  // PostgreSQL error handling
  if (err.code) {
    switch (err.code) {
      case '23505':
        statusCode = 409
        message = 'A record with this information already exists'
        break

      case '23503':
        statusCode = 400
        message = 'Related record does not exist or is still referenced'
        break

      case '23502':
        statusCode = 400
        message = 'A required database field is missing'
        break

      case '22P02':
        statusCode = 400
        message = 'Invalid data format'
        break

      default:
        statusCode = err.statusCode || 500
        message = statusCode === 500
          ? 'Internal server error'
          : err.message
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', err)
  }

  return res.status(statusCode).json({
    success: false,
    message
  })
}

module.exports = errorHandler
