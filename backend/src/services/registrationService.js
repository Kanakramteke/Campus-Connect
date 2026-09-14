const prisma = require('../config/db')
const { createNotification } = require('./notificationService')

const registerForEvent = async (userId, eventId, payload = {}) => {
  const event = await prisma.event.findUnique({ where: { id: eventId } })
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

  const existingReg = await prisma.registration.findUnique({
    where: { eventId_studentId: { eventId, studentId: userId } }
  })

  if (existingReg) {
    const err = new Error('You are already enrolled in this event')
    err.statusCode = 400
    throw err
  }

  // Check seat limit
  const currentCount = await prisma.registration.count({
    where: { eventId, registrationStatus: 'confirmed' }
  })

  if (currentCount >= event.seats) {
    const err = new Error('Event is full. No seats available.')
    err.statusCode = 400
    throw err
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  const newRegId = `CC-REG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  const paymentStatus = event.isFree ? 'free' : (payload.paymentStatus || 'paid')
  const paymentMethod = payload.paymentMethod || (event.isFree ? 'Free' : 'UPI')
  const amountPaid = event.isFree ? 0 : Number(payload.paymentAmount || event.registrationFee)
  const transactionId = event.isFree ? 'N/A' : (payload.transactionId || `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`)

  const registration = await prisma.registration.create({
    data: {
      eventId,
      studentId: userId,
      registrationId: newRegId,
      registrationStatus: 'confirmed',
      paymentStatus,
      paymentMethod,
      amountPaid,
      transactionId
    }
  })

  // Create registration notification
  await createNotification(userId, {
    category: 'events',
    type: 'event_registration',
    title: event.isFree ? 'Registration Confirmed' : 'Payment & Registration Confirmed',
    message: `You're successfully registered for ${event.title} organized by ${event.college}.`,
    relatedEntityType: 'event',
    relatedEntityId: event.id,
    actionRoute: 'events',
    actionParams: { eventId: event.id },
    actionLabel: 'View Event'
  })

  // Create payment notification if paid
  if (!event.isFree) {
    await createNotification(userId, {
      category: 'payments',
      type: 'payment_success',
      title: 'Payment Successful',
      message: `Your payment of ₹${amountPaid} for ${event.title} was confirmed (TXN: ${transactionId}).`,
      relatedEntityType: 'event',
      relatedEntityId: event.id,
      actionRoute: 'my-events',
      actionLabel: 'View Pass'
    })
  }

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
    paymentAmount: registration.amountPaid,
    transactionId: registration.transactionId,
    participantInfo: {
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      college: user.college
    }
  }
}

const getUserRegistrations = async (userId) => {
  const registrations = await prisma.registration.findMany({
    where: { studentId: userId },
    include: { event: true },
    orderBy: { registeredAt: 'desc' }
  })

  const user = await prisma.user.findUnique({ where: { id: userId } })

  return registrations.map(reg => ({
    id: reg.id,
    eventId: reg.eventId,
    studentId: reg.studentId,
    registrationId: reg.registrationId,
    registrationDate: reg.registeredAt.toISOString().split('T')[0],
    registeredAt: reg.registeredAt,
    registrationStatus: reg.registrationStatus,
    paymentStatus: reg.paymentStatus,
    paymentMethod: reg.paymentMethod,
    paymentAmount: reg.amountPaid,
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
