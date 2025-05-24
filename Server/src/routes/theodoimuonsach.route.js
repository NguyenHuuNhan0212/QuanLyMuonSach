const express = require('express')
const router = express.Router()
const muonSachController = require('../controllers/theodoimuonsach.controller')

//chưa nghĩ ra được chuẩn RESTful 
router.get('/', muonSachController.getAllForUser)
    .get('/admin', muonSachController.getAllForAdmin)
    .post('/', muonSachController.addBorrow)
    .patch('/:muonId', muonSachController.updateBorrowForUser)
    .delete('/users/:muonId', muonSachController.deleteBorrowForUser)
    .delete('/admin/:muonId', muonSachController.deleteBorrowForAdmin)
module.exports = router