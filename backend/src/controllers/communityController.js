const communityService = require('../services/communityService')
const { communitySchema, postSchema, commentSchema } = require('../validators/communityValidator')
const { sendSuccess } = require('../utils/responseHandler')

const getCommunities = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null
    const communities = await communityService.getCommunities(req.query, userId)
    return res.status(200).json(communities)
  } catch (err) {
    next(err)
  }
}

const getCommunityById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null
    const community = await communityService.getCommunityById(req.params.id, userId)
    return res.status(200).json(community)
  } catch (err) {
    next(err)
  }
}

const createCommunity = async (req, res, next) => {
  try {
    const validatedData = communitySchema.parse(req.body)
    const newComm = await communityService.createCommunity(validatedData, req.user.id)
    return res.status(201).json(newComm)
  } catch (err) {
    next(err)
  }
}

const updateCommunity = async (req, res, next) => {
  try {
    const updated = await communityService.updateCommunity(req.params.id, req.body, req.user.id)
    return res.status(200).json(updated)
  } catch (err) {
    next(err)
  }
}

const publishCommunity = async (req, res, next) => {
  try {
    const published = await communityService.publishCommunity(req.params.id, req.user.id)
    return res.status(200).json(published)
  } catch (err) {
    next(err)
  }
}

const deleteCommunity = async (req, res, next) => {
  try {
    const result = await communityService.deleteCommunity(req.params.id, req.user.id)
    return sendSuccess(res, 'Community deleted successfully', result)
  } catch (err) {
    next(err)
  }
}

const joinCommunity = async (req, res, next) => {
  try {
    const result = await communityService.joinCommunity(req.user.id, req.params.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const leaveCommunity = async (req, res, next) => {
  try {
    const result = await communityService.leaveCommunity(req.user.id, req.params.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const getJoinedCommunityIds = async (req, res, next) => {
  try {
    const ids = await communityService.getUserJoinedCommunityIds(req.user.id)
    return res.status(200).json(ids)
  } catch (err) {
    next(err)
  }
}

const addPost = async (req, res, next) => {
  try {
    const validated = postSchema.parse(req.body)
    const post = await communityService.addPost(req.params.id, req.user.id, validated)
    return res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

const addComment = async (req, res, next) => {
  try {
    const validated = commentSchema.parse(req.body)
    const comment = await communityService.addComment(req.params.id, req.user.id, validated)
    return res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

const toggleLikePost = async (req, res, next) => {
  try {
    const result = await communityService.toggleLikePost(req.params.id, req.user.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
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
  getJoinedCommunityIds,
  addPost,
  addComment,
  toggleLikePost
}
