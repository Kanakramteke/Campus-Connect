const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const registrationController = require('../controllers/registrationController')
const { authenticateToken, optionalAuth } = require('../middleware/auth')
const { requireRole } = require('../middleware/role')

// Registration my route must come BEFORE /:id
router.get('/registrations/my', authenticateToken, registrationController.getMyRegistrations)
router.get('/bookmarks/ids', authenticateToken, eventController.getBookmarks)

router.get('/', optionalAuth, eventController.getEvents)
router.get('/:id', optionalAuth, eventController.getEventById)

router.post('/', authenticateToken, requireRole('EVENT_ORGANIZER', 'STUDENT', 'CLUB_HEAD', 'COMMUNITY_ADMIN'), eventController.createEvent)
router.patch('/:id', authenticateToken, requireRole('EVENT_ORGANIZER', 'STUDENT', 'CLUB_HEAD', 'COMMUNITY_ADMIN'), eventController.updateEvent)
router.delete('/:id', authenticateToken, requireRole('EVENT_ORGANIZER', 'STUDENT', 'CLUB_HEAD', 'COMMUNITY_ADMIN'), eventController.deleteEvent)

router.post('/:id/publish', authenticateToken, requireRole('EVENT_ORGANIZER', 'STUDENT', 'CLUB_HEAD', 'COMMUNITY_ADMIN'), eventController.publishEvent)

router.post('/:id/register', authenticateToken, registrationController.registerForEvent)
router.post('/:id/bookmark', authenticateToken, eventController.toggleBookmark)

module.exports = router
