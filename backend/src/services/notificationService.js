
const { randomUUID } = require('crypto')
const pool = require('../config/db')

const createNotification = async (userId, data, db = pool) => {
  const id = randomUUID()

  const result = await db.query(
    `INSERT INTO "Notification" (
      id,
      "userId",
      category,
      type,
      title,
      message,
      "isRead",
      "relatedEntityType",
      "relatedEntityId",
      "actionRoute",
      "actionParams",
      "actionLabel",
      "createdAt"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
    RETURNING *`,
    [
      id,
      userId,
      data.category || 'events',
      data.type || 'system',
      data.title,
      data.message,
      false,
      data.relatedEntityType || null,
      data.relatedEntityId || null,
      data.actionRoute || null,
      data.actionParams ? JSON.stringify(data.actionParams) : null,
      data.actionLabel || 'View Details'
    ]
  )

  return formatNotification(result.rows[0])
}

const formatNotification = (notif) => {
  let actionParams = null

  if (notif.actionParams) {
    try {
      actionParams = typeof notif.actionParams === 'string'
        ? JSON.parse(notif.actionParams)
        : notif.actionParams
    } catch (err) {
      actionParams = null
    }
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
    timestamp: notif.createdAt
      ? new Date(notif.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      : 'Recent'
  }
}

const getUserNotifications = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM "Notification"
     WHERE "userId" = $1
     ORDER BY "createdAt" DESC`,
    [userId]
  )

  return result.rows.map(formatNotification)
}

const markAsRead = async (id, userId, isRead = true) => {
  await pool.query(
    `UPDATE "Notification"
     SET "isRead" = $1
     WHERE id = $2 AND "userId" = $3`,
    [isRead, id, userId]
  )

  return {
    message: `Notification marked as ${isRead ? 'read' : 'unread'}`
  }
}

const markAllAsRead = async (userId) => {
  await pool.query(
    `UPDATE "Notification"
     SET "isRead" = TRUE
     WHERE "userId" = $1 AND "isRead" = FALSE`,
    [userId]
  )

  return {
    message: 'All notifications marked as read'
  }
}

const deleteNotification = async (id, userId) => {
  await pool.query(
    `DELETE FROM "Notification"
     WHERE id = $1 AND "userId" = $2`,
    [id, userId]
  )

  return {
    message: 'Notification deleted'
  }
}

module.exports = {
  createNotification,
  formatNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
}
