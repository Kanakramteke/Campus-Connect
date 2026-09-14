const path = require('path')

const uploadSingleImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const host = req.get('host')
    const protocol = req.protocol
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      url: fileUrl,
      imageUrl: fileUrl,
      filename: req.file.filename
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  uploadSingleImage
}
