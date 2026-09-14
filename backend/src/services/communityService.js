const prisma = require('../config/db')
const { createNotification } = require('./notificationService')

const formatCommunity = async (comm, currentUserId = null) => {
  let interests = []
  if (comm.interests) {
    try { interests = JSON.parse(comm.interests) } catch (e) { interests = [comm.interests] }
  }

  const membersCount = await prisma.communityMember.count({
    where: { communityId: comm.id }
  })

  // Fetch posts for community feed
  const posts = await prisma.post.findMany({
    where: { communityId: comm.id },
    include: {
      comments: { orderBy: { createdAt: 'asc' } },
      likes: true
    },
    orderBy: { createdAt: 'desc' }
  })

  const popularPosts = posts.map(post => {
    const userLiked = currentUserId ? post.likes.some(l => l.userId === currentUserId) : false
    return {
      id: post.id,
      communityId: post.communityId,
      author: post.authorName,
      college: post.authorCollege,
      avatar: post.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorName.replace(/\s+/g, '')}`,
      timestamp: 'Recently',
      title: post.title,
      content: post.content,
      likes: post.likesCount,
      userLiked,
      repliesCount: post.comments.length,
      replies: post.comments.map(c => ({
        id: c.id,
        author: c.authorName,
        college: c.authorCollege,
        avatar: c.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.authorName.replace(/\s+/g, '')}`,
        content: c.content,
        timestamp: 'Recently'
      }))
    }
  })

  return {
    id: comm.id,
    name: comm.name,
    category: comm.category,
    college: comm.college,
    description: comm.description,
    image: comm.image || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    banner: comm.image || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    interests,
    members: Math.max(membersCount, 1),
    activeDiscussions: posts.length,
    creatorId: comm.creatorId,
    status: comm.status.toLowerCase(),
    popularPosts,
    createdAt: comm.createdAt,
    updatedAt: comm.updatedAt
  }
}

const getCommunities = async (query = {}, userId = null) => {
  const where = {}

  if (query.category) {
    where.category = { contains: query.category }
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

  const communities = await prisma.community.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  return Promise.all(communities.map(c => formatCommunity(c, userId)))
}

const getCommunityById = async (id, userId = null) => {
  const comm = await prisma.community.findUnique({ where: { id } })
  if (!comm) {
    const err = new Error('Community not found')
    err.statusCode = 404
    throw err
  }
  return formatCommunity(comm, userId)
}

const createCommunity = async (data, creatorId) => {
  const newComm = await prisma.community.create({
    data: {
      name: data.name,
      category: data.category || 'General',
      college: data.college || 'Inter-College Nagpur',
      description: data.description,
      image: data.image || data.banner || null,
      interests: data.interests ? JSON.stringify(data.interests) : null,
      creatorId,
      status: (data.status || 'PUBLISHED').toUpperCase()
    }
  })

  // Creator automatically joins
  await prisma.communityMember.create({
    data: {
      communityId: newComm.id,
      userId: creatorId
    }
  })

  return formatCommunity(newComm, creatorId)
}

const updateCommunity = async (id, data, creatorId) => {
  const comm = await prisma.community.findUnique({ where: { id } })
  if (!comm) {
    const err = new Error('Community not found')
    err.statusCode = 404
    throw err
  }

  if (comm.creatorId !== creatorId) {
    const err = new Error('Forbidden. You can only modify your own community.')
    err.statusCode = 403
    throw err
  }

  const updateData = {}
  if (data.name) updateData.name = data.name
  if (data.category) updateData.category = data.category
  if (data.college) updateData.college = data.college
  if (data.description) updateData.description = data.description
  if (data.image || data.banner) updateData.image = data.image || data.banner
  if (data.interests !== undefined) updateData.interests = JSON.stringify(data.interests)
  if (data.status) updateData.status = data.status.toUpperCase()

  const updated = await prisma.community.update({
    where: { id },
    data: updateData
  })

  return formatCommunity(updated, creatorId)
}

const publishCommunity = async (id, creatorId) => {
  return updateCommunity(id, { status: 'PUBLISHED' }, creatorId)
}

const deleteCommunity = async (id, creatorId) => {
  const comm = await prisma.community.findUnique({ where: { id } })
  if (!comm) {
    const err = new Error('Community not found')
    err.statusCode = 404
    throw err
  }

  if (comm.creatorId !== creatorId) {
    const err = new Error('Forbidden. You can only delete your own community.')
    err.statusCode = 403
    throw err
  }

  await prisma.community.delete({ where: { id } })
  return { message: 'Community deleted successfully' }
}

const joinCommunity = async (userId, communityId) => {
  const comm = await prisma.community.findUnique({ where: { id: communityId } })
  if (!comm) {
    const err = new Error('Community not found')
    err.statusCode = 404
    throw err
  }

  const existing = await prisma.communityMember.findUnique({
    where: { communityId_userId: { communityId, userId } }
  })

  if (existing) {
    return { joined: true, message: 'Already a member of this community' }
  }

  await prisma.communityMember.create({
    data: { communityId, userId }
  })

  await createNotification(userId, {
    category: 'communities',
    type: 'community_joined',
    title: `Welcome to ${comm.name}!`,
    message: `You have successfully joined ${comm.name} (${comm.college}). Join the inter-college discussion feed!`,
    relatedEntityType: 'community',
    relatedEntityId: communityId,
    actionRoute: 'community-details',
    actionParams: { communityId },
    actionLabel: 'View Community'
  })

  return { joined: true, message: `Joined ${comm.name} successfully!` }
}

const leaveCommunity = async (userId, communityId) => {
  const existing = await prisma.communityMember.findUnique({
    where: { communityId_userId: { communityId, userId } }
  })

  if (!existing) {
    return { joined: false, message: 'Not a member of this community' }
  }

  await prisma.communityMember.delete({
    where: { communityId_userId: { communityId, userId } }
  })

  return { joined: false, message: 'Left community successfully' }
}

const getUserJoinedCommunityIds = async (userId) => {
  const members = await prisma.communityMember.findMany({
    where: { userId },
    select: { communityId: true }
  })
  return members.map(m => m.communityId)
}

const addPost = async (communityId, userId, data) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  const comm = await prisma.community.findUnique({ where: { id: communityId } })

  const post = await prisma.post.create({
    data: {
      communityId,
      authorId: userId,
      authorName: user.name,
      authorCollege: user.college,
      authorAvatar: user.profileImage,
      title: data.title,
      content: data.content
    }
  })

  await createNotification(userId, {
    category: 'communities',
    type: 'community_post',
    title: 'Discussion Post Published',
    message: `Your post "${data.title}" is live in ${comm?.name || 'Community'}.`,
    relatedEntityType: 'community',
    relatedEntityId: communityId,
    actionRoute: 'community-details',
    actionParams: { communityId },
    actionLabel: 'View Discussion'
  })

  return {
    id: post.id,
    communityId: post.communityId,
    author: post.authorName,
    college: post.authorCollege,
    avatar: post.authorAvatar,
    timestamp: 'Just now',
    title: post.title,
    content: post.content,
    likes: 0,
    userLiked: false,
    repliesCount: 0,
    replies: []
  }
}

const addComment = async (postId, userId, data) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  const post = await prisma.post.findUnique({ where: { id: postId } })

  if (!post) {
    const err = new Error('Post not found')
    err.statusCode = 404
    throw err
  }

  const comment = await prisma.comment.create({
    data: {
      postId,
      authorId: userId,
      authorName: user.name,
      authorCollege: user.college,
      authorAvatar: user.profileImage,
      content: data.content
    }
  })

  await createNotification(userId, {
    category: 'communities',
    type: 'community_comment',
    title: 'Reply Published',
    message: `Your reply was added to the discussion thread in ${post.authorCollege}.`,
    relatedEntityType: 'community',
    relatedEntityId: post.communityId,
    actionRoute: 'community-details',
    actionParams: { communityId: post.communityId },
    actionLabel: 'View Thread'
  })

  return {
    id: comment.id,
    author: comment.authorName,
    college: comment.authorCollege,
    avatar: comment.authorAvatar,
    content: comment.content,
    timestamp: 'Just now'
  }
}

const toggleLikePost = async (postId, userId) => {
  const existing = await prisma.postLike.findUnique({
    where: { postId_userId: { postId, userId } }
  })

  if (existing) {
    await prisma.postLike.delete({
      where: { postId_userId: { postId, userId } }
    })
    await prisma.post.update({
      where: { id: postId },
      data: { likesCount: { decrement: 1 } }
    })
    return { liked: false }
  } else {
    await prisma.postLike.create({
      data: { postId, userId }
    })
    await prisma.post.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } }
    })
    return { liked: true }
  }
}

module.exports = {
  getCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  publishCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
  getUserJoinedCommunityIds,
  addPost,
  addComment,
  toggleLikePost
}
