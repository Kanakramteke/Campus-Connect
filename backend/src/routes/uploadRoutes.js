const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/uploadController')
const upload = require('../middleware/upload')
const { authenticateToken } = require('../middleware/auth')

router.post('/', authenticateToken, upload.single('file'), uploadController.uploadSingleImage)
router.post('/image', authenticateToken, upload.single('file'), uploadController.uploadSingleImage)

module.exports = router
