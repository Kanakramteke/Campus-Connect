const userService = require('../services/userService')
const { updateProfileSchema } = require('../validators/userValidator')
const { sendSuccess } = require('../utils/responseHandler')

const getProfile = async (req, res, next) => {
  try {
    const profile = await userService.getUserProfile(req.user.id)
    return res.status(200).json(profile)
  } catch (err) {
    next(err)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const validatedData = updateProfileSchema.parse(req.body)
    const updatedProfile = await userService.updateUserProfile(req.user.id, validatedData)
    return res.status(200).json(updatedProfile)
  } catch (err) {
    next(err)
  }
}

const deleteAccount = async (req, res, next) => {
  try {
    const result = await userService.deleteUserAccount(req.user.id)
    return sendSuccess(res, 'Account deleted successfully', result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount
}
