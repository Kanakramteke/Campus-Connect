const clubService = require('../services/clubService')
const { clubSchema } = require('../validators/clubValidator')
const { sendSuccess } = require('../utils/responseHandler')

const getClubs = async (req, res, next) => {
  try {
    const clubs = await clubService.getClubs(req.query)
    return res.status(200).json(clubs)
  } catch (err) {
    next(err)
  }
}

const getClubById = async (req, res, next) => {
  try {
    const club = await clubService.getClubById(req.params.id)
    return res.status(200).json(club)
  } catch (err) {
    next(err)
  }
}

const createClub = async (req, res, next) => {
  try {
    const validatedData = clubSchema.parse(req.body)
    const newClub = await clubService.createClub(validatedData, req.user.id)
    return res.status(201).json(newClub)
  } catch (err) {
    next(err)
  }
}

const updateClub = async (req, res, next) => {
  try {
    const updated = await clubService.updateClub(req.params.id, req.body, req.user.id)
    return res.status(200).json(updated)
  } catch (err) {
    next(err)
  }
}

const publishClub = async (req, res, next) => {
  try {
    const published = await clubService.publishClub(req.params.id, req.user.id)
    return res.status(200).json(published)
  } catch (err) {
    next(err)
  }
}

const deleteClub = async (req, res, next) => {
  try {
    const result = await clubService.deleteClub(req.params.id, req.user.id)
    return sendSuccess(res, 'Club deleted successfully', result)
  } catch (err) {
    next(err)
  }
}

const joinClub = async (req, res, next) => {
  try {
    const result = await clubService.joinClub(req.user.id, req.params.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const leaveClub = async (req, res, next) => {
  try {
    const result = await clubService.leaveClub(req.user.id, req.params.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const getJoinedClubIds = async (req, res, next) => {
  try {
    const ids = await clubService.getUserJoinedClubIds(req.user.id)
    return res.status(200).json(ids)
  } catch (err) {
    next(err)
  }
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
  getJoinedClubIds
}
