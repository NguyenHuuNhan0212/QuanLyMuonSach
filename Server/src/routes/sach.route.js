const express = require('express')
const router = express.Router()
const SachController = require('../controllers/sach.controller')

router.get('/', SachController.getAll)
    .post('/', SachController.addBook)
    .patch('/:MaSach', SachController.updateBook)
    .delete('/:MaSach', SachController.deleteBook)
    .delete('/', SachController.deleteAllBook)
module.exports = router