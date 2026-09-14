const prisma = require('../config/db')
const { createNotification } = require('./notificationService')

const formatClub = (club) => {
  let activities = []
  if (club.activities) {
    try { activities = JSON.parse(club.activities) } catch (e) { activities = [club.activities] }
  }

  let leadership = { lead: 'Club Executive', coLead: 'Vice Lead' }
  if (club.leadership) {
    try { leadership = JSON.parse(club.leadership) } catch (e) {}
  }

  return {
    id: club.id,
    name: club.name,
    category: club.category.toLowerCase(), // 'technical', 'cultural', 'other'
    type: club.category.toLowerCase(),
    college: club.college,
    description: club.description,
    image: club.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    logo: club.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
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

const getClubs = async (query = {}) => {
  const where = {}

  if (query.category) {
    where.category = query.category.toUpperCase()
  }

  if (query.status) {
    where.status = query.status.toUpperCase()
  } else {
    where.status = 'PUBLISHED'
  }

  if (query.search) {
    where.OR = [
      { name: { contains: query.search } },
      { description: { contains: query.search } },
      { college: { contains: query.search } }
    ]
  }

  const clubs = await prisma.club.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  return clubs.map(formatClub)
}

const getClubById = async (id) => {
  const club = await prisma.club.findUnique({ where: { id } })
  if (!club) {
    const err = new Error('Club not found')
    err.statusCode = 404
    throw err
  }
  return formatClub(club)
}

const createClub = async (data, creatorId) => {
  const newClub = await prisma.club.create({
    data: {
      name: data.name,
      category: (data.category || 'TECHNICAL').toUpperCase(),
      college: data.college || 'VNIT Nagpur',
      description: data.description,
      image: data.image || data.logo || null,
      membersCount: 1,
      activities: data.activities ? JSON.stringify(data.activities) : null,
      leadership: data.leadership ? JSON.stringify(data.leadership) : null,
      creatorId,
      status: (data.status || 'PUBLISHED').toUpperCase()
    }
  })

  // Creator automatically becomes a member
  await prisma.clubMember.create({
    data: {
      clubId: newClub.id,
      userId: creatorId,
      role: 'LEAD'
    }
  })

  return formatClub(newClub)
}

const updateClub = async (id, data, creatorId) => {
  const club = await prisma.club.findUnique({ where: { id } })
  if (!club) {
    const err = new Error('Club not found')
    err.statusCode = 404
    throw err
  }

  if (club.creatorId !== creatorId) {
    const err = new Error('Forbidden. You can only modify your own club.')
    err.statusCode = 403
    throw err
  }

  const updateData = {}
  if (data.name) updateData.name = data.name
  if (data.category) updateData.category = data.category.toUpperCase()
  if (data.college) updateData.college = data.college
  if (data.description) updateData.description = data.description
  if (data.image || data.logo) updateData.image = data.image || data.logo
  if (data.activities !== undefined) updateData.activities = JSON.stringify(data.activities)
  if (data.leadership !== undefined) updateData.leadership = JSON.stringify(data.leadership)
  if (data.status) updateData.status = data.status.toUpperCase()

  const updated = await prisma.club.update({
    where: { id },
    data: updateData
  })

  return formatClub(updated)
}

const publishClub = async (id, creatorId) => {
  return updateClub(id, { status: 'PUBLISHED' }, creatorId)
}

const deleteClub = async (id, creatorId) => {
  const club = await prisma.club.findUnique({ where: { id } })
  if (!club) {
    const err = new Error('Club not found')
    err.statusCode = 404
    throw err
  }

  if (club.creatorId !== creatorId) {
    const err = new Error('Forbidden. You can only delete your own club.')
    err.statusCode = 403
    throw err
  }

  await prisma.club.delete({ where: { id } })
  return { message: 'Club deleted successfully' }
}

const joinClub = async (userId, clubId) => {
  const club = await prisma.club.findUnique({ where: { id: clubId } })
  if (!club) {
    const err = new Error('Club not found')
    err.statusCode = 404
    throw err
  }

  const existing = await prisma.clubMember.findUnique({
    where: { clubId_userId: { clubId, userId } }
  })

  if (existing) {
    return { joined: true, message: 'Already a member of this club' }
  }

  await prisma.clubMember.create({
    data: { clubId, userId }
  })

  await prisma.club.update({
    where: { id: clubId },
    data: { membersCount: { increment: 1 } }
  })

  await createNotification(userId, {
    category: 'clubs',
    type: 'club_joined',
    title: `Welcome to ${club.name}!`,
    message: `You are now a member of ${club.name} (${club.college}). Stay tuned for upcoming activities!`,
    relatedEntityType: 'club',
    relatedEntityId: clubId,
    actionRoute: 'club-details',
    actionParams: { clubId },
    actionLabel: 'View Club'
  })

  return { joined: true, message: `Joined ${club.name} successfully!` }
}

const leaveClub = async (userId, clubId) => {
  const existing = await prisma.clubMember.findUnique({
    where: { clubId_userId: { clubId, userId } }
  })

  if (!existing) {
    return { joined: false, message: 'Not a member of this club' }
  }

  await prisma.clubMember.delete({
    where: { clubId_userId: { clubId, userId } }
  })

  await prisma.club.update({
    where: { id: clubId },
    data: { membersCount: { decrement: 1 } }
  })

  return { joined: false, message: 'Left club successfully' }
}

const getUserJoinedClubIds = async (userId) => {
  const members = await prisma.clubMember.findMany({
    where: { userId },
    select: { clubId: true }
  })
  return members.map(m => m.clubId)
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
