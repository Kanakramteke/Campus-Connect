const prisma = require('../config/db')
const { formatUserResponse } = require('./authService')

const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    const err = new Error('User not found')
    err.statusCode = 404
    throw err
  }
  return formatUserResponse(user)
}

const updateUserProfile = async (userId, data) => {
  const updatePayload = {}
  if (data.fullName || data.name) updatePayload.name = data.fullName || data.name
  if (data.email) updatePayload.email = data.email
  if (data.college) updatePayload.college = data.college
  if (data.phone !== undefined) updatePayload.phone = data.phone
  if (data.profileImage || data.avatar) updatePayload.profileImage = data.profileImage || data.avatar
  if (data.interests !== undefined) {
    updatePayload.interests = Array.isArray(data.interests) ? JSON.stringify(data.interests) : data.interests
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updatePayload
  })

  return formatUserResponse(updatedUser)
}

const deleteUserAccount = async (userId) => {
  await prisma.user.delete({ where: { id: userId } })
  return { message: 'Account deleted successfully' }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount
}
