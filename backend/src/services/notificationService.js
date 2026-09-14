const prisma = require('../config/db')

const createNotification = async (userId, data) => {
  const notification = await prisma.notification.create({
    data: {
      userId,
      category: data.category || 'events',
      type: data.type || 'system',
      title: data.title,
      message: data.message,
      isRead: false,
      relatedEntityType: data.relatedEntityType || null,
      relatedEntityId: data.relatedEntityId || null,
      actionRoute: data.actionRoute || null,
      actionParams: data.actionParams ? JSON.stringify(data.actionParams) : null,
      actionLabel: data.actionLabel || 'View Details'
    }
  })

  return formatNotification(notification)
}

const formatNotification = (notif) => {
  let actionParams = null
  if (notif.actionParams) {
    try { actionParams = JSON.parse(notif.actionParams) } catch (e) {}
  }

  return {
    id: notif.id,
    userId: notif.userId,
    category: notif.category,
    type: notif.type,
    title: notif.title,
    message: notif.message,
    isRead: notif.isRead,
    relatedEntityType: notif.relatedEntityType,
    relatedEntityId: notif.relatedEntityId,
    actionRoute: notif.actionRoute,
    actionParams,
    actionLabel: notif.actionLabel,
    createdAt: notif.createdAt,
    timestamp: notif.createdAt ? new Date(notif.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'
  }
}

const getUserNotifications = async (userId) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
  return notifications.map(formatNotification)
}

const markAsRead = async (id, userId, isRead = true) => {
  await prisma.notification.updateMany({
    where: { id, userId },
    data: { isRead }
  })
  return { message: `Notification marked as ${isRead ? 'read' : 'unread'}` }
}

const markAllAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  })
  return { message: 'All notifications marked as read' }
}

const deleteNotification = async (id, userId) => {
  await prisma.notification.deleteMany({
    where: { id, userId }
  })
  return { message: 'Notification deleted' }
}

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
}
