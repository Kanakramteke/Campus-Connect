const notificationService = require('../services/notificationService')

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user.id)
    return res.status(200).json(notifications)
  } catch (err) {
    next(err)
  }
}

const markAsRead = async (req, res, next) => {
  try {
    const isRead = req.body && req.body.isRead !== undefined ? Boolean(req.body.isRead) : true
    const result = await notificationService.markAsRead(req.params.id, req.user.id, isRead)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const markAllAsRead = async (req, res, next) => {
  try {
    const result = await notificationService.markAllAsRead(req.user.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const deleteNotification = async (req, res, next) => {
  try {
    const result = await notificationService.deleteNotification(req.params.id, req.user.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
}
