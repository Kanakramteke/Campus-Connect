const { registerSchema, loginSchema, changePasswordSchema } = require('../validators/authValidator')
const authService = require('../services/authService')
const { sendSuccess } = require('../utils/responseHandler')

const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body)
    const result = await authService.registerUser(validatedData)
    return res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const result = await authService.loginUser(email, password)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const getMe = async (req, res, next) => {
  try {
    const formattedUser = authService.formatUserResponse(req.user)
    return res.status(200).json(formattedUser)
  } catch (err) {
    next(err)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body)
    const result = await authService.changePassword(req.user.id, currentPassword, newPassword)
    return sendSuccess(res, 'Password changed successfully', result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  getMe,
  changePassword
}
