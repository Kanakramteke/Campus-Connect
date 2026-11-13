
const { randomUUID } = require('crypto')
const pool = require('../config/db')
const { createNotification } = require('./notificationService')

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'

const createError = (message, statusCode) => {
  const err = new Error(message)
  err.statusCode = statusCode
  return err
}

const formatClub = (club) => {
  let activities = []
  if (club.activities) {
    try {
      activities = JSON.parse(club.activities)
    } catch (e) {
      activities = [club.activities]
    }
  }

  let leadership = { lead: 'Club Executive', coLead: 'Vice Lead' }
  if (club.leadership) {
    try {
      leadership = JSON.parse(club.leadership)
    } catch (e) {}
  }

  return {
    id: club.id,
    name: club.name,
    category: club.category.toLowerCase(),
    type: club.category.toLowerCase(),
    college: club.college,
    description: club.description,
    image: club.image || DEFAULT_IMAGE,
    logo: club.image || DEFAULT_IMAGE,
    members: club.membersCount,
    membersCount: club.membersCount,
    activities,
    leadership,
    creatorId: club.creatorId,
    status: club.status.toLowerCase(),
    createdAt: club.createdAt,
    updatedAt: club.updatedAt
  }
}

// Get all clubs
const getClubs = async (query = {}) => {
  const conditions = []
  const values = []

  if (query.category) {
    values.push(query.category.toUpperCase())
    conditions.push(`category = $${values.length}`)
  }

  if (query.status) {
    values.push(query.status.toUpperCase())
    conditions.push(`status = $${values.length}`)
  } else {
    values.push('PUBLISHED')
    conditions.push(`status = $${values.length}`)
  }

  if (query.search) {
    values.push(`%${query.search}%`)
    const searchIndex = values.length

    conditions.push(`(
      name LIKE $${searchIndex}
      OR description LIKE $${searchIndex}
      OR college LIKE $${searchIndex}
    )`)
  }

  const result = await pool.query(
    `SELECT *
     FROM "Club"
     WHERE ${conditions.join(' AND ')}
     ORDER BY "createdAt" DESC`,
    values
  )

  return result.rows.map(formatClub)
}

// Get club by ID
const getClubById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM "Club" WHERE id = $1`,
    [id]
  )

  const club = result.rows[0]

  if (!club) {
    throw createError('Club not found', 404)
  }

  return formatClub(club)
}

// Create club and automatically add creator as LEAD
const createClub = async (data, creatorId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const clubId = randomUUID()

    const result = await client.query(
      `INSERT INTO "Club" (
        id,
        name,
        category,
        college,
        description,
        image,
        "membersCount",
        activities,
        leadership,
        "creatorId",
        status,
        "createdAt",
        "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
      RETURNING *`,
      [
        clubId,
        data.name,
        (data.category || 'TECHNICAL').toUpperCase(),
        data.college || 'VNIT Nagpur',
        data.description,
        data.image || data.logo || null,
        1,
        data.activities ? JSON.stringify(data.activities) : null,
        data.leadership ? JSON.stringify(data.leadership) : null,
        creatorId,
        (data.status || 'PUBLISHED').toUpperCase()
      ]
    )

    const newClub = result.rows[0]

    await client.query(
      `INSERT INTO "ClubMember" (
        id,
        "clubId",
        "userId",
        role,
        "joinedAt"
      )
      VALUES ($1, $2, $3, $4, NOW())`,
      [randomUUID(), clubId, creatorId, 'LEAD']
    )

    await client.query('COMMIT')

    return formatClub(newClub)
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Update club
const updateClub = async (id, data, creatorId) => {
  const existingResult = await pool.query(
    `SELECT * FROM "Club" WHERE id = $1`,
    [id]
  )

  const club = existingResult.rows[0]

  if (!club) {
    throw createError('Club not found', 404)
  }

  if (club.creatorId !== creatorId) {
    throw createError(
      'Forbidden. You can only modify your own club.',
      403
    )
  }

  const updateData = {}

  if (data.name) updateData.name = data.name
  if (data.category) updateData.category = data.category.toUpperCase()
  if (data.college) updateData.college = data.college
  if (data.description) updateData.description = data.description
  if (data.image || data.logo) updateData.image = data.image || data.logo

  if (data.activities !== undefined) {
    updateData.activities = JSON.stringify(data.activities)
  }

  if (data.leadership !== undefined) {
    updateData.leadership = JSON.stringify(data.leadership)
  }

  if (data.status) updateData.status = data.status.toUpperCase()

  const fields = Object.keys(updateData)
  const values = fields.map(field => updateData[field])

  if (fields.length === 0) {
    return formatClub(club)
  }

  const columnNames = {
    name: 'name',
    category: 'category',
    college: 'college',
    description: 'description',
    image: 'image',
    activities: 'activities',
    leadership: 'leadership',
    status: 'status'
  }

  const setClause = fields.map((field, index) => {
    return `"${columnNames[field]}" = $${index + 1}`
  })

  values.push(id)

  const result = await pool.query(
    `UPDATE "Club"
     SET ${setClause.join(', ')},
         "updatedAt" = NOW()
     WHERE id = $${values.length}
     RETURNING *`,
    values
  )

  return formatClub(result.rows[0])
}

// Publish club
const publishClub = async (id, creatorId) => {
  return updateClub(id, { status: 'PUBLISHED' }, creatorId)
}

// Delete club
const deleteClub = async (id, creatorId) => {
  const result = await pool.query(
    `SELECT * FROM "Club" WHERE id = $1`,
    [id]
  )

  const club = result.rows[0]

  if (!club) {
    throw createError('Club not found', 404)
  }

  if (club.creatorId !== creatorId) {
    throw createError(
      'Forbidden. You can only delete your own club.',
      403
    )
  }

  await pool.query(
    `DELETE FROM "Club" WHERE id = $1`,
    [id]
  )

  return { message: 'Club deleted successfully' }
}

// Join club
const joinClub = async (userId, clubId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const clubResult = await client.query(
      `SELECT * FROM "Club" WHERE id = $1 FOR UPDATE`,
      [clubId]
    )

    const club = clubResult.rows[0]

    if (!club) {
      throw createError('Club not found', 404)
    }

    const membershipResult = await client.query(
      `INSERT INTO "ClubMember" (
        id,
        "clubId",
        "userId",
        role,
        "joinedAt"
      )
      VALUES ($1, $2, $3, 'MEMBER', NOW())
      ON CONFLICT ("clubId", "userId") DO NOTHING
      RETURNING id`,
      [randomUUID(), clubId, userId]
    )

    if (membershipResult.rowCount === 0) {
      await client.query('COMMIT')
      return {
        joined: true,
        message: 'Already a member of this club'
      }
    }

    await client.query(
      `UPDATE "Club"
       SET "membersCount" = "membersCount" + 1,
           "updatedAt" = NOW()
       WHERE id = $1`,
      [clubId]
    )

    await createNotification(
      userId,
      {
        category: 'clubs',
        type: 'club_joined',
        title: `Welcome to ${club.name}!`,
        message: `You are now a member of ${club.name} (${club.college}). Stay tuned for upcoming activities!`,
        relatedEntityType: 'club',
        relatedEntityId: clubId,
        actionRoute: 'club-details',
        actionParams: { clubId },
        actionLabel: 'View Club'
      },
      client
    )

    await client.query('COMMIT')

    return {
      joined: true,
      message: `Joined ${club.name} successfully!`
    }
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Leave club
const leaveClub = async (userId, clubId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const membershipResult = await client.query(
      `DELETE FROM "ClubMember"
       WHERE "clubId" = $1 AND "userId" = $2
       RETURNING id`,
      [clubId, userId]
    )

    if (membershipResult.rowCount === 0) {
      await client.query('COMMIT')
      return {
        joined: false,
        message: 'Not a member of this club'
      }
    }

    await client.query(
      `UPDATE "Club"
       SET "membersCount" = GREATEST("membersCount" - 1, 0),
           "updatedAt" = NOW()
       WHERE id = $1`,
      [clubId]
    )

    await client.query('COMMIT')

    return {
      joined: false,
      message: 'Left club successfully'
    }
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Get IDs of clubs joined by a user
const getUserJoinedClubIds = async (userId) => {
  const result = await pool.query(
    `SELECT "clubId"
     FROM "ClubMember"
     WHERE "userId" = $1`,
    [userId]
  )

  return result.rows.map(member => member.clubId)
}

module.exports = {
  getClubs,
  getClubById,
  createClub,
  updateClub,
  publishClub,
  deleteClub,
  joinClub,
  leaveClub,
  getUserJoinedClubIds
}
