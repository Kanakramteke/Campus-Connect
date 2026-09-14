const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/db')
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

  return {
    id: user.id,
    fullName: user.name,
    name: user.name,
    email: user.email,
    college: user.college,
    phone: user.phone || '',
    profileImage: user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name.replace(/\s+/g, '')}`,
    avatar: user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name.replace(/\s+/g, '')}`,
    interests,
    role: user.role,
    createdAt: user.createdAt
  }
}

const registerUser = async (data) => {
  const normalizedEmail = data.email.trim().toLowerCase()

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  })

  if (existingUser) {
    const error = new Error('An account with this email already exists.')
    error.statusCode = 409 // 409 Conflict
    throw error
  }

  const passwordHash = await bcrypt.hash(data.password, 10)
  const newUser = await prisma.user.create({
    data: {
      name: data.fullName,
      email: normalizedEmail,
      passwordHash,
      college: data.college || 'VNIT Nagpur',
      phone: data.phone || '',
      role: 'STUDENT'
    }
  })

  const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })

  return {
    access_token: token,
    token,
    user: formatUserResponse(newUser)
  }
}

const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase()

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  })

  if (!user) {
    const error = new Error('Invalid email or password.')
    error.statusCode = 401 // 401 Unauthorized
    throw error
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password.')
    error.statusCode = 401 // 401 Unauthorized
    throw error
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })

  return {
    access_token: token,
    token,
    user: formatUserResponse(user)
  }
}

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    const error = new Error('User not found')
    error.statusCode = 404
    throw error
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!isPasswordValid) {
    const error = new Error('Current password is incorrect')
    error.statusCode = 400
    throw error
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newPasswordHash }
  })

  return { message: 'Password updated successfully' }
}

module.exports = {
  formatUserResponse,
  registerUser,
  loginUser,
  changePassword
}
