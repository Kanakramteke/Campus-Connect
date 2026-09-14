const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authenticateToken } = require('../middleware/auth')

router.get('/me', authenticateToken, userController.getProfile)
router.get('/profile', authenticateToken, userController.getProfile)
router.patch('/me', authenticateToken, userController.updateProfile)
router.put('/profile', authenticateToken, userController.updateProfile)
router.delete('/me', authenticateToken, userController.deleteAccount)

module.exports = router
