const express = require('express')
const router = express.Router()
const communityController = require('../controllers/communityController')
const { authenticateToken, optionalAuth } = require('../middleware/auth')
const { requireRole } = require('../middleware/role')

router.get('/joined/ids', authenticateToken, communityController.getJoinedCommunityIds)

router.get('/', optionalAuth, communityController.getCommunities)
router.get('/:id', optionalAuth, communityController.getCommunityById)

router.post('/', authenticateToken, requireRole('COMMUNITY_ADMIN', 'STUDENT', 'EVENT_ORGANIZER', 'CLUB_HEAD'), communityController.createCommunity)
router.patch('/:id', authenticateToken, requireRole('COMMUNITY_ADMIN', 'STUDENT', 'EVENT_ORGANIZER', 'CLUB_HEAD'), communityController.updateCommunity)
router.delete('/:id', authenticateToken, requireRole('COMMUNITY_ADMIN', 'STUDENT', 'EVENT_ORGANIZER', 'CLUB_HEAD'), communityController.deleteCommunity)

router.post('/:id/publish', authenticateToken, requireRole('COMMUNITY_ADMIN', 'STUDENT', 'EVENT_ORGANIZER', 'CLUB_HEAD'), communityController.publishCommunity)

router.post('/:id/join', authenticateToken, communityController.joinCommunity)
router.delete('/:id/leave', authenticateToken, communityController.leaveCommunity)

router.post('/:id/posts', authenticateToken, communityController.addPost)
router.post('/posts/:id/comments', authenticateToken, communityController.addComment)
router.post('/posts/:id/like', authenticateToken, communityController.toggleLikePost)

module.exports = router
