const express = require('express')
const router = express.Router()
const muonSachController = require('../controllers/theodoimuonsach.controller')
const { verifyTokenUser, verifyTokenStaff } = require('../middlewares/verifyToken')
//chưa nghĩ ra được chuẩn RESTful 
router.get('/', verifyTokenUser, muonSachController.getAllForUser)
    .get('/staff', verifyTokenStaff, muonSachController.getAllForAdmin)
    .post('/', verifyTokenUser, muonSachController.addBorrow)
    .patch('/:muonId', verifyTokenStaff, muonSachController.updateBorrowForAdmin)
    .delete('/users/:muonId', verifyTokenUser, muonSachController.deleteBorrowForUser)
    .delete('/staffs/:muonId', verifyTokenStaff, muonSachController.deleteBorrowForAdmin)
module.exports = router