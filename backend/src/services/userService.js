
const pool = require('../config/db')
const { formatUserResponse } = require('./authService')

const getUserProfile = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM "User" WHERE id = $1',
    [userId]
  )

  const user = result.rows[0]

  if (!user) {
    const err = new Error('User not found')
    err.statusCode = 404
    throw err
  }

  return formatUserResponse(user)
}

const updateUserProfile = async (userId, data) => {
  const updatePayload = {}

  if (data.fullName || data.name) {
    updatePayload.name = data.fullName || data.name
  }

  if (data.email) {
    updatePayload.email = data.email.trim().toLowerCase()
  }

  if (data.college) {
    updatePayload.college = data.college
  }

  if (data.phone !== undefined) {
    updatePayload.phone = data.phone
  }

  if (data.profileImage || data.avatar) {
    updatePayload.profileImage = data.profileImage || data.avatar
  }

  if (data.interests !== undefined) {
    updatePayload.interests = Array.isArray(data.interests)
      ? JSON.stringify(data.interests)
      : data.interests
  }

  const fields = Object.keys(updatePayload)

  if (fields.length === 0) {
    return getUserProfile(userId)
  }

  const setClauses = fields.map(
    (field, index) => `"${field}" = $${index + 1}`
  )

  // Automatically update the modification timestamp.
  setClauses.push('"updatedAt" = NOW()')

  const values = fields.map(field => updatePayload[field])
  values.push(userId)

  const query = `
    UPDATE "User"
    SET ${setClauses.join(', ')}
    WHERE id = $${values.length}
    RETURNING *
  `

  try {
    const result = await pool.query(query, values)
    const updatedUser = result.rows[0]

    if (!updatedUser) {
      const err = new Error('User not found')
      err.statusCode = 404
      throw err
    }

    return formatUserResponse(updatedUser)

  } catch (err) {
    if (err.code === '23505') {
      const error = new Error(
        'An account with this email already exists.'
      )
      error.statusCode = 409
      throw error
    }

    throw err
  }
}

const deleteUserAccount = async (userId) => {
  const result = await pool.query(
    'DELETE FROM "User" WHERE id = $1 RETURNING id',
    [userId]
  )

  if (result.rows.length === 0) {
    const err = new Error('User not found')
    err.statusCode = 404
    throw err
  }

  return {
    message: 'Account deleted successfully'
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount
}
