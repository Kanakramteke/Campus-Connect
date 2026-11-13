
const crypto = require('crypto')
const pool = require('../config/db')
const { createNotification } = require('./notificationService')

const registerForEvent = async (userId, eventId, payload = {}) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const eventResult = await client.query(
      'SELECT * FROM "Event" WHERE id = $1 FOR UPDATE',
      [eventId]
    )

    const event = eventResult.rows[0]

    if (!event) {
      const err = new Error('Event not found')
      err.statusCode = 404
      throw err
    }

    if (event.status !== 'PUBLISHED') {
      const err = new Error('Registration is not open for this event')
      err.statusCode = 400
      throw err
    }

    const existingResult = await client.query(
      `SELECT id
       FROM "Registration"
       WHERE "eventId" = $1 AND "studentId" = $2`,
      [eventId, userId]
    )

    if (existingResult.rows.length > 0) {
      const err = new Error('You are already enrolled in this event')
      err.statusCode = 400
      throw err
    }

    const countResult = await client.query(
      `SELECT COUNT(*)::int AS count
       FROM "Registration"
       WHERE "eventId" = $1
       AND "registrationStatus" = 'confirmed'`,
      [eventId]
    )

    if (countResult.rows[0].count >= event.seats) {
      const err = new Error('Event is full. No seats available.')
      err.statusCode = 400
      throw err
    }

    const userResult = await client.query(
      'SELECT * FROM "User" WHERE id = $1',
      [userId]
    )

    const user = userResult.rows[0]

    if (!user) {
      const err = new Error('User not found')
      err.statusCode = 404
      throw err
    }

    const registrationId =
      `CC-REG-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`

    const isFree = event.isFree
    const paymentStatus = isFree
      ? 'free'
      : (payload.paymentStatus || 'paid')

    const paymentMethod = payload.paymentMethod ||
      (isFree ? 'Free' : 'UPI')

    const amountPaid = isFree
      ? 0
      : Number(payload.paymentAmount || event.registrationFee)

    const transactionId = isFree
      ? 'N/A'
      : (payload.transactionId ||
          `TXN-${crypto.randomBytes(6).toString('hex').toUpperCase()}`)

    const registrationResult = await client.query(
      `INSERT INTO "Registration" (
        id,
        "eventId",
        "studentId",
        "registrationId",
        "registrationStatus",
        "paymentStatus",
        "paymentMethod",
        "amountPaid",
        "transactionId",
        "registeredAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING *`,
      [
        crypto.randomUUID(),
        eventId,
        userId,
        registrationId,
        'confirmed',
        paymentStatus,
        paymentMethod,
        amountPaid,
        transactionId
      ]
    )

    const registration = registrationResult.rows[0]

    await createNotification(
      userId,
      {
        category: 'events',
        type: 'event_registration',
        title: isFree
          ? 'Registration Confirmed'
          : 'Payment & Registration Confirmed',
        message: `You're successfully registered for ${event.title} organized by ${event.college}.`,
        relatedEntityType: 'event',
        relatedEntityId: event.id,
        actionRoute: 'events',
        actionParams: { eventId: event.id },
        actionLabel: 'View Event'
      },
      client
    )

    if (!isFree) {
      await createNotification(
        userId,
        {
          category: 'payments',
          type: 'payment_success',
          title: 'Payment Successful',
          message: `Your payment of ₹${amountPaid} for ${event.title} was confirmed (TXN: ${transactionId}).`,
          relatedEntityType: 'event',
          relatedEntityId: event.id,
          actionRoute: 'my-events',
          actionLabel: 'View Pass'
        },
        client
      )
    }

    await client.query('COMMIT')

    return {
      id: registration.id,
      eventId: registration.eventId,
      studentId: registration.studentId,
      registrationId: registration.registrationId,
      registrationDate: registration.registeredAt.toISOString().split('T')[0],
      registeredAt: registration.registeredAt,
      registrationStatus: registration.registrationStatus,
      paymentStatus: registration.paymentStatus,
      paymentMethod: registration.paymentMethod,
      paymentAmount: Number(registration.amountPaid),
      transactionId: registration.transactionId,
      participantInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        college: user.college
      }
    }
  } catch (err) {
    await client.query('ROLLBACK')

    if (err.code === '23505') {
      const error = new Error('You are already enrolled in this event')
      error.statusCode = 400
      throw error
    }

    throw err
  } finally {
    client.release()
  }
}

const getUserRegistrations = async (userId) => {
  const result = await pool.query(
    `SELECT
       r.*,
       row_to_json(e) AS event
     FROM "Registration" r
     INNER JOIN "Event" e ON e.id = r."eventId"
     WHERE r."studentId" = $1
     ORDER BY r."registeredAt" DESC`,
    [userId]
  )

  const userResult = await pool.query(
    'SELECT * FROM "User" WHERE id = $1',
    [userId]
  )

  const user = userResult.rows[0]

  if (!user) {
    const err = new Error('User not found')
    err.statusCode = 404
    throw err
  }

  return result.rows.map(reg => ({
    id: reg.id,
    eventId: reg.eventId,
    studentId: reg.studentId,
    registrationId: reg.registrationId,
    registrationDate: reg.registeredAt.toISOString().split('T')[0],
    registeredAt: reg.registeredAt,
    registrationStatus: reg.registrationStatus,
    paymentStatus: reg.paymentStatus,
    paymentMethod: reg.paymentMethod,
    paymentAmount: Number(reg.amountPaid),
    transactionId: reg.transactionId || 'N/A',
    participantInfo: {
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      college: user.college
    },
    event: reg.event
  }))
}

module.exports = {
  registerForEvent,
  getUserRegistrations
}
