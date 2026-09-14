const express = require('express')
const router = express.Router()
const clubController = require('../controllers/clubController')
const { authenticateToken, optionalAuth } = require('../middleware/auth')
const { requireRole } = require('../middleware/role')

router.get('/joined/ids', authenticateToken, clubController.getJoinedClubIds)

router.get('/', optionalAuth, clubController.getClubs)
router.get('/:id', optionalAuth, clubController.getClubById)

router.post('/', authenticateToken, requireRole('CLUB_HEAD', 'STUDENT', 'EVENT_ORGANIZER', 'COMMUNITY_ADMIN'), clubController.createClub)
router.patch('/:id', authenticateToken, requireRole('CLUB_HEAD', 'STUDENT', 'EVENT_ORGANIZER', 'COMMUNITY_ADMIN'), clubController.updateClub)
router.delete('/:id', authenticateToken, requireRole('CLUB_HEAD', 'STUDENT', 'EVENT_ORGANIZER', 'COMMUNITY_ADMIN'), clubController.deleteClub)

router.post('/:id/publish', authenticateToken, requireRole('CLUB_HEAD', 'STUDENT', 'EVENT_ORGANIZER', 'COMMUNITY_ADMIN'), clubController.publishClub)

router.post('/:id/join', authenticateToken, clubController.joinClub)
router.delete('/:id/leave', authenticateToken, clubController.leaveClub)

module.exports = router
