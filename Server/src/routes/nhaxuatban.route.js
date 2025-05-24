const express = require('express')
const router = express.Router()
const nhaXuatBanController = require('../controllers/nhaxuatban.controller')

router.get('/', nhaXuatBanController.getAll)
    .post('/', nhaXuatBanController.addPublisher)
    .patch('/:MaNXB', nhaXuatBanController.updatePublisher)
    .delete('/:MaNXB', nhaXuatBanController.deletePublisher)
    .delete('/', nhaXuatBanController.deleteAllPublishers)
module.exports = router