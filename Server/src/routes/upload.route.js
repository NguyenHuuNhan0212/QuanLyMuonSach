// src/routes/upload.route.js
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload.middleware')

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Không có file được tải lên.' })
    }

    // Đường dẫn công khai
    const imageUrl = `/uploads/${req.file.filename}`

    return res.status(200).json({
        message: 'Upload ảnh thành công.',
        imageUrl
    })
})

module.exports = router
