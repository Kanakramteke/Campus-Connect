const prisma = require('../config/db')

const formatEvent = (event) => {
  return {
    id: event.id,
    title: event.title,
    category: event.category.toLowerCase(), // 'technical' or 'cultural'
    type: event.category.toLowerCase(),
    tagline: event.tagline || '',
    description: event.description,
    image: event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    banner: event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    date: event.date,
    time: event.time,
    location: event.location,
    venue: event.venue,
    registrationFee: event.registrationFee,
    isFree: event.isFree,
    seats: event.seats,
    seatsAvailable: event.seats,
    eligibility: event.eligibility || 'All Students',
    organizedBy: event.organizedBy,
    organizingCollege: event.college,
    college: event.college,
    creatorId: event.creatorId,
    status: event.status.toLowerCase(),
    whatToExpect: event.whatToExpect || '',
    createdAt: event.createdAt,
    updatedAt: event.updatedAt
  }
}

const getEvents = async (query = {}) => {
  const where = {}

  if (query.category) {
    where.category = query.category.toUpperCase()
  }

  if (query.type) {
    where.category = query.type.toUpperCase()
  }

  if (query.college) {
    where.college = { contains: query.college }
  }

  if (query.status) {
    where.status = query.status.toUpperCase()
  } else {
    where.status = 'PUBLISHED'
  }

  if (query.search) {
    where.OR = [
      { title: { contains: query.search } },
      { description: { contains: query.search } },
      { college: { contains: query.search } }
    ]
  }

  if (query.fee === 'free') {
    where.isFree = true
  } else if (query.fee === 'paid') {
    where.isFree = false
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  return events.map(formatEvent)
}

const getEventById = async (id) => {
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) {
    const err = new Error('Event not found')
    err.statusCode = 404
    throw err
  }
  return formatEvent(event)
}

const createEvent = async (data, creatorId) => {
  const isFree = data.registrationFee ? Number(data.registrationFee) === 0 : (data.isFree !== undefined ? data.isFree : true)
  const newEvent = await prisma.event.create({
    data: {
      title: data.title,
      category: (data.category || 'TECHNICAL').toUpperCase(),
      tagline: data.tagline || '',
      description: data.description,
      image: data.image || data.banner || null,
      date: data.date,
      time: data.time,
      location: data.location,
      venue: data.venue,
      registrationFee: Number(data.registrationFee || 0),
      isFree,
      seats: Number(data.seats || 100),
      eligibility: data.eligibility || 'All Students',
      organizedBy: data.organizedBy || 'Campus Society',
      college: data.college || data.organizingCollege || 'VNIT Nagpur',
      creatorId,
      status: (data.status || 'PUBLISHED').toUpperCase(),
      whatToExpect: data.whatToExpect || ''
    }
  })
  return formatEvent(newEvent)
}

const updateEvent = async (id, data, creatorId) => {
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) {
    const err = new Error('Event not found')
    err.statusCode = 404
    throw err
  }

  if (event.creatorId !== creatorId) {
    const err = new Error('Forbidden. You can only modify your own events.')
    err.statusCode = 403
    throw err
  }

  const updateData = {}
  if (data.title) updateData.title = data.title
  if (data.category) updateData.category = data.category.toUpperCase()
  if (data.tagline !== undefined) updateData.tagline = data.tagline
  if (data.description) updateData.description = data.description
  if (data.image || data.banner) updateData.image = data.image || data.banner
  if (data.date) updateData.date = data.date
  if (data.time) updateData.time = data.time
  if (data.location) updateData.location = data.location
  if (data.venue) updateData.venue = data.venue
  if (data.registrationFee !== undefined) {
    updateData.registrationFee = Number(data.registrationFee)
    updateData.isFree = Number(data.registrationFee) === 0
  }
  if (data.seats !== undefined) updateData.seats = Number(data.seats)
  if (data.eligibility !== undefined) updateData.eligibility = data.eligibility
  if (data.organizedBy) updateData.organizedBy = data.organizedBy
  if (data.college || data.organizingCollege) updateData.college = data.college || data.organizingCollege
  if (data.status) updateData.status = data.status.toUpperCase()
  if (data.whatToExpect !== undefined) updateData.whatToExpect = data.whatToExpect

  const updated = await prisma.event.update({
    where: { id },
    data: updateData
  })

  return formatEvent(updated)
}

const publishEvent = async (id, creatorId) => {
  return updateEvent(id, { status: 'PUBLISHED' }, creatorId)
}

const deleteEvent = async (id, creatorId) => {
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) {
    const err = new Error('Event not found')
    err.statusCode = 404
    throw err
  }

  if (event.creatorId !== creatorId) {
    const err = new Error('Forbidden. You can only delete your own events.')
    err.statusCode = 403
    throw err
  }

  await prisma.event.delete({ where: { id } })
  return { message: 'Event deleted successfully' }
}

const toggleBookmark = async (userId, eventId) => {
  const existing = await prisma.bookmark.findUnique({
    where: { userId_eventId: { userId, eventId } }
  })

  if (existing) {
    await prisma.bookmark.delete({
      where: { userId_eventId: { userId, eventId } }
    })
    return { bookmarked: false, message: 'Event removed from bookmarks' }
  } else {
    await prisma.bookmark.create({
      data: { userId, eventId }
    })
    return { bookmarked: true, message: 'Event bookmarked' }
  }
}

const getUserBookmarkIds = async (userId) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    select: { eventId: true }
  })
  return bookmarks.map(b => b.eventId)
}

module.exports = {
  formatEvent,
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  publishEvent,
  deleteEvent,
  toggleBookmark,
  getUserBookmarkIds
}
