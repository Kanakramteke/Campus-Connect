const registrationService = require('../services/registrationService')

const registerForEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id || req.body.eventId
    const registration = await registrationService.registerForEvent(req.user.id, eventId, req.body)
    return res.status(201).json(registration)
  } catch (err) {
    next(err)
  }
}

const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await registrationService.getUserRegistrations(req.user.id)
    return res.status(200).json(registrations)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  registerForEvent,
  getMyRegistrations
}
