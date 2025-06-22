const express = require('express')
const router = express.Router()
const nhaXuatBanController = require('../controllers/nhaxuatban.controller')
const { verifyTokenStaff } = require('../middlewares/verifyToken')

router.get('/',verifyTokenStaff, nhaXuatBanController.getAll)
    .post('/', verifyTokenStaff, nhaXuatBanController.addPublisher)
    .patch('/:MaNXB', verifyTokenStaff, nhaXuatBanController.updatePublisher)
    .delete('/:MaNXB', verifyTokenStaff, nhaXuatBanController.deletePublisher)
    .delete('/', verifyTokenStaff, nhaXuatBanController.deleteAllPublishers)
module.exports = router