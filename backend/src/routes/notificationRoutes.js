const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')
const { authenticateToken } = require('../middleware/auth')

router.get('/', authenticateToken, notificationController.getNotifications)
router.post('/read-all', authenticateToken, notificationController.markAllAllRead || notificationController.markAllAsRead)
router.patch('/read-all', authenticateToken, notificationController.markAllAsRead)
router.post('/:id/read', authenticateToken, notificationController.markAsRead)
router.patch('/:id/read', authenticateToken, notificationController.markAsRead)
router.delete('/:id', authenticateToken, notificationController.deleteNotification)

module.exports = router
