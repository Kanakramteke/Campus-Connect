
const { randomUUID } = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env')

const formatUserResponse = (user) => {
  let interests = []

  if (user.interests) {
    try {
      interests = JSON.parse(user.interests)
    } catch (e) {
      interests = user.interests.split(',').map(s => s.trim())
    }
  }

  const avatar = user.profileImage ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name.replace(/\s+/g, '')}`

  return {
    id: user.id,
    fullName: user.name,
    name: user.name,
    email: user.email,
    college: user.college,
    phone: user.phone || '',
    profileImage: avatar,
    avatar,
    interests,
    role: user.role,
    createdAt: user.createdAt
  }
}

const registerUser = async (data) => {
  const normalizedEmail = data.email.trim().toLowerCase()

  const existingUser = await pool.query(
    'SELECT id FROM "User" WHERE email = $1',
    [normalizedEmail]
  )

  if (existingUser.rows.length > 0) {
    const error = new Error('An account with this email already exists.')
    error.statusCode = 409
    throw error
  }

  const passwordHash = await bcrypt.hash(data.password, 10)

  try {
    const userId = randomUUID()

    const result = await pool.query(
      `INSERT INTO "User" (
        id,
        name,
        email,
        "passwordHash",
        college,
        phone,
        role,
        "createdAt",
        "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *`,
      [
        userId,
        data.fullName,
        normalizedEmail,
        passwordHash,
        data.college || 'VNIT Nagpur',
        data.phone || '',
        'STUDENT'
      ]
    )

    const newUser = result.rows[0]

    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    return {
      access_token: token,
      token,
      user: formatUserResponse(newUser)
    }
  } catch (err) {
    if (err.code === '23505') {
      const error = new Error('An account with this email already exists.')
      error.statusCode = 409
      throw error
    }

    throw err
  }
}

const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase()

  const result = await pool.query(
    'SELECT * FROM "User" WHERE email = $1',
    [normalizedEmail]
  )

  const user = result.rows[0]

  if (!user) {
    const error = new Error('Invalid email or password.')
    error.statusCode = 401
    throw error
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  )

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password.')
    error.statusCode = 401
    throw error
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )

  return {
    access_token: token,
    token,
    user: formatUserResponse(user)
  }
}

const changePassword = async (userId, currentPassword, newPassword) => {
  const result = await pool.query(
    'SELECT * FROM "User" WHERE id = $1',
    [userId]
  )

  const user = result.rows[0]

  if (!user) {
    const error = new Error('User not found')
    error.statusCode = 404
    throw error
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  )

  if (!isPasswordValid) {
    const error = new Error('Current password is incorrect')
    error.statusCode = 400
    throw error
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10)

  await pool.query(
    `UPDATE "User"
     SET "passwordHash" = $1, "updatedAt" = NOW()
     WHERE id = $2`,
    [newPasswordHash, userId]
  )

  return {
    message: 'Password updated successfully'
  }
}

module.exports = {
  formatUserResponse,
  registerUser,
  loginUser,
  changePassword
}
