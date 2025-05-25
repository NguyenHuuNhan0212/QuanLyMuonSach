const express = require('express')
const router = express.Router()
const muonSachController = require('../controllers/theodoimuonsach.controller')

//chưa nghĩ ra được chuẩn RESTful 
router.get('/', muonSachController.getAllForUser)
    .get('/staff', muonSachController.getAllForAdmin)
    .post('/', muonSachController.addBorrow)
    .patch('/:muonId', muonSachController.updateBorrowForAdmin)
    .delete('/users/:muonId', muonSachController.deleteBorrowForUser)
    .delete('/staffs/:muonId', muonSachController.deleteBorrowForAdmin)
module.exports = router