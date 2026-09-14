const eventService = require('../services/eventService')
const { eventSchema } = require('../validators/eventValidator')
const { sendSuccess } = require('../utils/responseHandler')

const getEvents = async (req, res, next) => {
  try {
    const events = await eventService.getEvents(req.query)
    return res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

const getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id)
    return res.status(200).json(event)
  } catch (err) {
    next(err)
  }
}

const createEvent = async (req, res, next) => {
  try {
    const validatedData = eventSchema.parse(req.body)
    const newEvent = await eventService.createEvent(validatedData, req.user.id)
    return res.status(201).json(newEvent)
  } catch (err) {
    next(err)
  }
}

const updateEvent = async (req, res, next) => {
  try {
    const updated = await eventService.updateEvent(req.params.id, req.body, req.user.id)
    return res.status(200).json(updated)
  } catch (err) {
    next(err)
  }
}

const publishEvent = async (req, res, next) => {
  try {
    const published = await eventService.publishEvent(req.params.id, req.user.id)
    return res.status(200).json(published)
  } catch (err) {
    next(err)
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const result = await eventService.deleteEvent(req.params.id, req.user.id)
    return sendSuccess(res, 'Event deleted successfully', result)
  } catch (err) {
    next(err)
  }
}

const toggleBookmark = async (req, res, next) => {
  try {
    const result = await eventService.toggleBookmark(req.user.id, req.params.id)
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const getBookmarks = async (req, res, next) => {
  try {
    const bookmarkIds = await eventService.getUserBookmarkIds(req.user.id)
    return res.status(200).json(bookmarkIds)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  publishEvent,
  deleteEvent,
  toggleBookmark,
  getBookmarks
}
