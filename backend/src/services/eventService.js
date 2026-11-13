
const { randomUUID } = require('crypto')
const pool = require('../config/db')

const formatEvent = (event) => {
  return {
    id: event.id,
    title: event.title,
    category: event.category.toLowerCase(),
    type: event.category.toLowerCase(),
    tagline: event.tagline || '',
    description: event.description,
    image: event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    banner: event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    date: event.date,
    time: event.time,
    location: event.location,
    venue: event.venue,
    registrationFee: Number(event.registrationFee),
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
  const conditions = []
  const values = []

  const addCondition = (condition, value) => {
    values.push(value)
    conditions.push(condition.replace('?', `$${values.length}`))
  }

  if (query.category) {
    addCondition('"category" = ?', query.category.toUpperCase())
  }

  if (query.type) {
    addCondition('"category" = ?', query.type.toUpperCase())
  }

  if (query.college) {
    addCondition('"college" LIKE ?', `%${query.college}%`)
  }

  if (query.status) {
    addCondition('"status" = ?', query.status.toUpperCase())
  } else {
    addCondition('"status" = ?', 'PUBLISHED')
  }

  if (query.search) {
    values.push(
      `%${query.search}%`,
      `%${query.search}%`,
      `%${query.search}%`
    )

    const start = values.length - 2

    conditions.push(
      `(title LIKE $${start} OR description LIKE $${start + 1} OR college LIKE $${start + 2})`
    )
  }

  if (query.fee === 'free') {
    conditions.push('"isFree" = TRUE')
  } else if (query.fee === 'paid') {
    conditions.push('"isFree" = FALSE')
  }

  const sql = `
    SELECT *
    FROM "Event"
    ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
    ORDER BY "createdAt" DESC
  `

  const result = await pool.query(sql, values)

  return result.rows.map(formatEvent)
}

const getEventById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM "Event" WHERE id = $1',
    [id]
  )

  const event = result.rows[0]

  if (!event) {
    const err = new Error('Event not found')
    err.statusCode = 404
    throw err
  }

  return formatEvent(event)
}

const createEvent = async (data, creatorId) => {
  const eventId = randomUUID()
  const registrationFee = Number(data.registrationFee || 0)

  const isFree = data.registrationFee !== undefined
    ? registrationFee === 0
    : (data.isFree !== undefined ? data.isFree : true)

  const result = await pool.query(
    `INSERT INTO "Event" (
      id,
      title,
      category,
      tagline,
      description,
      image,
      date,
      time,
      location,
      venue,
      "registrationFee",
      "isFree",
      seats,
      eligibility,
      "organizedBy",
      college,
      "creatorId",
      status,
      "whatToExpect",
      "createdAt",
      "updatedAt"
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18,
      $19, NOW(), NOW()
    )
    RETURNING *`,
    [
      eventId,
      data.title,
      (data.category || 'TECHNICAL').toUpperCase(),
      data.tagline || '',
      data.description,
      data.image || data.banner || null,
      data.date,
      data.time,
      data.location,
      data.venue,
      registrationFee,
      isFree,
      Number(data.seats || 100),
      data.eligibility || 'All Students',
      data.organizedBy || 'Campus Society',
      data.college || data.organizingCollege || 'VNIT Nagpur',
      creatorId,
      (data.status || 'PUBLISHED').toUpperCase(),
      data.whatToExpect || ''
    ]
  )

  return formatEvent(result.rows[0])
}

const updateEvent = async (id, data, creatorId) => {
  const existingResult = await pool.query(
    'SELECT * FROM "Event" WHERE id = $1',
    [id]
  )

  const event = existingResult.rows[0]

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

  if (data.isFree !== undefined && data.registrationFee === undefined) {
    updateData.isFree = data.isFree
  }

  if (data.seats !== undefined) updateData.seats = Number(data.seats)
  if (data.eligibility !== undefined) updateData.eligibility = data.eligibility
  if (data.organizedBy) updateData.organizedBy = data.organizedBy

  if (data.college || data.organizingCollege) {
    updateData.college = data.college || data.organizingCollege
  }

  if (data.status) updateData.status = data.status.toUpperCase()
  if (data.whatToExpect !== undefined) updateData.whatToExpect = data.whatToExpect

  const fields = Object.keys(updateData)

  if (fields.length === 0) {
    return formatEvent(event)
  }

  const values = fields.map(field => updateData[field])
  const setClauses = fields.map(
    (field, index) => `"${field}" = $${index + 1}`
  )

  values.push(id)

  const sql = `
    UPDATE "Event"
    SET ${setClauses.join(', ')}, "updatedAt" = NOW()
    WHERE id = $${values.length}
    RETURNING *
  `

  const result = await pool.query(sql, values)

  return formatEvent(result.rows[0])
}

const publishEvent = async (id, creatorId) => {
  return updateEvent(id, { status: 'PUBLISHED' }, creatorId)
}

const deleteEvent = async (id, creatorId) => {
  const result = await pool.query(
    'SELECT * FROM "Event" WHERE id = $1',
    [id]
  )

  const event = result.rows[0]

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

  await pool.query(
    'DELETE FROM "Event" WHERE id = $1',
    [id]
  )

  return { message: 'Event deleted successfully' }
}

const toggleBookmark = async (userId, eventId) => {
  const deleted = await pool.query(
    `DELETE FROM "Bookmark"
     WHERE "userId" = $1 AND "eventId" = $2
     RETURNING id`,
    [userId, eventId]
  )

  if (deleted.rows.length > 0) {
    return {
      bookmarked: false,
      message: 'Event removed from bookmarks'
    }
  }

  const bookmarkId = randomUUID()

  const inserted = await pool.query(
    `INSERT INTO "Bookmark" (
      id,
      "userId",
      "eventId",
      "createdAt"
    )
    VALUES ($1, $2, $3, NOW())
    ON CONFLICT ("userId", "eventId") DO NOTHING
    RETURNING id`,
    [bookmarkId, userId, eventId]
  )

  if (inserted.rows.length === 0) {
    return {
      bookmarked: true,
      message: 'Event already bookmarked'
    }
  }

  return {
    bookmarked: true,
    message: 'Event bookmarked'
  }
}

const getUserBookmarkIds = async (userId) => {
  const result = await pool.query(
    'SELECT "eventId" FROM "Bookmark" WHERE "userId" = $1',
    [userId]
  )

  return result.rows.map(bookmark => bookmark.eventId)
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
