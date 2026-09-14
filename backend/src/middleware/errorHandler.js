const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development' && err.statusCode === 500) {
    console.error('❌ Centralized Error:', err)
  }

  if (err.name === 'ZodError') {
    const formattedErrors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }))
    return res.status(400).json({
      success: false,
      message: err.errors[0]?.message || 'Validation failed',
      errors: formattedErrors
    })
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    })
  }

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  })
}

module.exports = errorHandler
