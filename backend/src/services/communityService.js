
const { randomUUID } = require('crypto')
const pool = require('../config/db')
const { createNotification } = require('./notificationService')

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'

const createError = (message, statusCode) => {
  const err = new Error(message)
  err.statusCode = statusCode
  return err
}

// Format a community and its discussion feed
const formatCommunity = async (comm, currentUserId = null) => {
  let interests = []

  if (comm.interests) {
    try {
      interests = JSON.parse(comm.interests)
    } catch (e) {
      interests = [comm.interests]
    }
  }

  const membersResult = await pool.query(
    `SELECT COUNT(*)::int AS count
     FROM "CommunityMember"
     WHERE "communityId" = $1`,
    [comm.id]
  )

  const membersCount = membersResult.rows[0].count

  const postsResult = await pool.query(
    `SELECT *
     FROM "Post"
     WHERE "communityId" = $1
     ORDER BY "createdAt" DESC`,
    [comm.id]
  )

  const posts = postsResult.rows
  let comments = []
  let likes = []

  if (posts.length > 0) {
    const postIds = posts.map(post => post.id)

    const commentsResult = await pool.query(
      `SELECT *
       FROM "Comment"
       WHERE "postId" = ANY($1::text[])
       ORDER BY "createdAt" ASC`,
      [postIds]
    )

    comments = commentsResult.rows

    const likesResult = await pool.query(
      `SELECT *
       FROM "PostLike"
       WHERE "postId" = ANY($1::text[])`,
      [postIds]
    )

    likes = likesResult.rows
  }

  const popularPosts = posts.map(post => {
    const postComments = comments.filter(
      comment => comment.postId === post.id
    )

    const postLikes = likes.filter(
      like => like.postId === post.id
    )

    const userLiked = currentUserId
      ? postLikes.some(like => like.userId === currentUserId)
      : false

    return {
      id: post.id,
      communityId: post.communityId,
      author: post.authorName,
      college: post.authorCollege,
      avatar: post.authorAvatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorName.replace(/\s+/g, '')}`,
      timestamp: 'Recently',
      title: post.title,
      content: post.content,
      likes: post.likesCount,
      userLiked,
      repliesCount: postComments.length,
      replies: postComments.map(comment => ({
        id: comment.id,
        author: comment.authorName,
        college: comment.authorCollege,
        avatar: comment.authorAvatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorName.replace(/\s+/g, '')}`,
        content: comment.content,
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
    image: comm.image || DEFAULT_IMAGE,
    banner: comm.image || DEFAULT_IMAGE,
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

// Get all communities
const getCommunities = async (query = {}, userId = null) => {
  const conditions = []
  const values = []

  if (query.category) {
    values.push(`%${query.category}%`)
    conditions.push(`category LIKE $${values.length}`)
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
     FROM "Community"
     WHERE ${conditions.join(' AND ')}
     ORDER BY "createdAt" DESC`,
    values
  )

  return Promise.all(
    result.rows.map(comm => formatCommunity(comm, userId))
  )
}

// Get community by ID
const getCommunityById = async (id, userId = null) => {
  const result = await pool.query(
    `SELECT *
     FROM "Community"
     WHERE id = $1`,
    [id]
  )

  const comm = result.rows[0]

  if (!comm) {
    throw createError('Community not found', 404)
  }

  return formatCommunity(comm, userId)
}

// Create community and automatically add creator as member
const createCommunity = async (data, creatorId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const communityId = randomUUID()

    const result = await client.query(
      `INSERT INTO "Community" (
        id,
        name,
        category,
        college,
        description,
        image,
        interests,
        "creatorId",
        status,
        "createdAt",
        "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING *`,
      [
        communityId,
        data.name,
        data.category || 'General',
        data.college || 'Inter-College Nagpur',
        data.description,
        data.image || data.banner || null,
        data.interests ? JSON.stringify(data.interests) : null,
        creatorId,
        (data.status || 'PUBLISHED').toUpperCase()
      ]
    )

    const newCommunity = result.rows[0]

    await client.query(
      `INSERT INTO "CommunityMember" (
        id,
        "communityId",
        "userId",
        "joinedAt"
      )
      VALUES ($1, $2, $3, NOW())`,
      [randomUUID(), communityId, creatorId]
    )

    await client.query('COMMIT')

    return formatCommunity(newCommunity, creatorId)
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Update community
const updateCommunity = async (id, data, creatorId) => {
  const existingResult = await pool.query(
    `SELECT *
     FROM "Community"
     WHERE id = $1`,
    [id]
  )

  const comm = existingResult.rows[0]

  if (!comm) {
    throw createError('Community not found', 404)
  }

  if (comm.creatorId !== creatorId) {
    throw createError(
      'Forbidden. You can only modify your own community.',
      403
    )
  }

  const updateData = {}

  if (data.name) updateData.name = data.name
  if (data.category) updateData.category = data.category
  if (data.college) updateData.college = data.college
  if (data.description) updateData.description = data.description

  if (data.image || data.banner) {
    updateData.image = data.image || data.banner
  }

  if (data.interests !== undefined) {
    updateData.interests = JSON.stringify(data.interests)
  }

  if (data.status) {
    updateData.status = data.status.toUpperCase()
  }

  const fields = Object.keys(updateData)

  if (fields.length === 0) {
    return formatCommunity(comm, creatorId)
  }

  const columnNames = {
    name: 'name',
    category: 'category',
    college: 'college',
    description: 'description',
    image: 'image',
    interests: 'interests',
    status: 'status'
  }

  const values = fields.map(field => updateData[field])

  const setClause = fields.map((field, index) => {
    return `"${columnNames[field]}" = $${index + 1}`
  })

  values.push(id)

  const result = await pool.query(
    `UPDATE "Community"
     SET ${setClause.join(', ')},
         "updatedAt" = NOW()
     WHERE id = $${values.length}
     RETURNING *`,
    values
  )

  return formatCommunity(result.rows[0], creatorId)
}

// Publish community
const publishCommunity = async (id, creatorId) => {
  return updateCommunity(id, { status: 'PUBLISHED' }, creatorId)
}

// Delete community
const deleteCommunity = async (id, creatorId) => {
  const result = await pool.query(
    `SELECT *
     FROM "Community"
     WHERE id = $1`,
    [id]
  )

  const comm = result.rows[0]

  if (!comm) {
    throw createError('Community not found', 404)
  }

  if (comm.creatorId !== creatorId) {
    throw createError(
      'Forbidden. You can only delete your own community.',
      403
    )
  }

  await pool.query(
    `DELETE FROM "Community"
     WHERE id = $1`,
    [id]
  )

  return { message: 'Community deleted successfully' }
}

// Join community
const joinCommunity = async (userId, communityId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const commResult = await client.query(
      `SELECT *
       FROM "Community"
       WHERE id = $1
       FOR UPDATE`,
      [communityId]
    )

    const comm = commResult.rows[0]

    if (!comm) {
      throw createError('Community not found', 404)
    }

    const membershipResult = await client.query(
      `INSERT INTO "CommunityMember" (
        id,
        "communityId",
        "userId",
        "joinedAt"
      )
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT ("communityId", "userId") DO NOTHING
      RETURNING id`,
      [randomUUID(), communityId, userId]
    )

    if (membershipResult.rowCount === 0) {
      await client.query('COMMIT')

      return {
        joined: true,
        message: 'Already a member of this community'
      }
    }

    await createNotification(
      userId,
      {
        category: 'communities',
        type: 'community_joined',
        title: `Welcome to ${comm.name}!`,
        message: `You have successfully joined ${comm.name} (${comm.college}). Join the inter-college discussion feed!`,
        relatedEntityType: 'community',
        relatedEntityId: communityId,
        actionRoute: 'community-details',
        actionParams: { communityId },
        actionLabel: 'View Community'
      },
      client
    )

    await client.query('COMMIT')

    return {
      joined: true,
      message: `Joined ${comm.name} successfully!`
    }
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Leave community
const leaveCommunity = async (userId, communityId) => {
  const result = await pool.query(
    `DELETE FROM "CommunityMember"
     WHERE "communityId" = $1
       AND "userId" = $2
     RETURNING id`,
    [communityId, userId]
  )

  if (result.rowCount === 0) {
    return {
      joined: false,
      message: 'Not a member of this community'
    }
  }

  return {
    joined: false,
    message: 'Left community successfully'
  }
}

// Get IDs of communities joined by a user
const getUserJoinedCommunityIds = async (userId) => {
  const result = await pool.query(
    `SELECT "communityId"
     FROM "CommunityMember"
     WHERE "userId" = $1`,
    [userId]
  )

  return result.rows.map(member => member.communityId)
}

// Add a post to a community
const addPost = async (communityId, userId, data) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const userResult = await client.query(
      `SELECT *
       FROM "User"
       WHERE id = $1`,
      [userId]
    )

    const user = userResult.rows[0]

    if (!user) {
      throw createError('User not found', 404)
    }

    const commResult = await client.query(
      `SELECT *
       FROM "Community"
       WHERE id = $1`,
      [communityId]
    )

    const comm = commResult.rows[0]

    if (!comm) {
      throw createError('Community not found', 404)
    }

    const postResult = await client.query(
      `INSERT INTO "Post" (
        id,
        "communityId",
        "authorId",
        "authorName",
        "authorCollege",
        "authorAvatar",
        title,
        content,
        "likesCount",
        "createdAt",
        "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, NOW(), NOW())
      RETURNING *`,
      [
        randomUUID(),
        communityId,
        userId,
        user.name,
        user.college,
        user.profileImage,
        data.title,
        data.content
      ]
    )

    const post = postResult.rows[0]

    await createNotification(
      userId,
      {
        category: 'communities',
        type: 'community_post',
        title: 'Discussion Post Published',
        message: `Your post "${data.title}" is live in ${comm.name || 'Community'}.`,
        relatedEntityType: 'community',
        relatedEntityId: communityId,
        actionRoute: 'community-details',
        actionParams: { communityId },
        actionLabel: 'View Discussion'
      },
      client
    )

    await client.query('COMMIT')

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
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Add a comment to a post
const addComment = async (postId, userId, data) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const userResult = await client.query(
      `SELECT *
       FROM "User"
       WHERE id = $1`,
      [userId]
    )

    const user = userResult.rows[0]

    if (!user) {
      throw createError('User not found', 404)
    }

    const postResult = await client.query(
      `SELECT *
       FROM "Post"
       WHERE id = $1`,
      [postId]
    )

    const post = postResult.rows[0]

    if (!post) {
      throw createError('Post not found', 404)
    }

    const commentResult = await client.query(
      `INSERT INTO "Comment" (
        id,
        "postId",
        "authorId",
        "authorName",
        "authorCollege",
        "authorAvatar",
        content,
        "createdAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *`,
      [
        randomUUID(),
        postId,
        userId,
        user.name,
        user.college,
        user.profileImage,
        data.content
      ]
    )

    const comment = commentResult.rows[0]

    await createNotification(
      userId,
      {
        category: 'communities',
        type: 'community_comment',
        title: 'Reply Published',
        message: `Your reply was added to the discussion thread in ${post.authorCollege}.`,
        relatedEntityType: 'community',
        relatedEntityId: post.communityId,
        actionRoute: 'community-details',
        actionParams: { communityId: post.communityId },
        actionLabel: 'View Thread'
      },
      client
    )

    await client.query('COMMIT')

    return {
      id: comment.id,
      author: comment.authorName,
      college: comment.authorCollege,
      avatar: comment.authorAvatar,
      content: comment.content,
      timestamp: 'Just now'
    }
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Like or unlike a post
const toggleLikePost = async (postId, userId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const postResult = await client.query(
      `SELECT id
       FROM "Post"
       WHERE id = $1
       FOR UPDATE`,
      [postId]
    )

    if (postResult.rowCount === 0) {
      throw createError('Post not found', 404)
    }

    const insertResult = await client.query(
      `INSERT INTO "PostLike" (
        id,
        "postId",
        "userId",
        "createdAt"
      )
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT ("postId", "userId") DO NOTHING
      RETURNING id`,
      [randomUUID(), postId, userId]
    )

    if (insertResult.rowCount > 0) {
      await client.query(
        `UPDATE "Post"
         SET "likesCount" = "likesCount" + 1,
             "updatedAt" = NOW()
         WHERE id = $1`,
        [postId]
      )

      await client.query('COMMIT')
      return { liked: true }
    }

    await client.query(
      `DELETE FROM "PostLike"
       WHERE "postId" = $1 AND "userId" = $2`,
      [postId, userId]
    )

    await client.query(
      `UPDATE "Post"
       SET "likesCount" = GREATEST("likesCount" - 1, 0),
           "updatedAt" = NOW()
       WHERE id = $1`,
      [postId]
    )

    await client.query('COMMIT')
    return { liked: false }
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
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
