const express = require('express')
const router = express.Router()
const xacThucController = require('../controllers/xacthuc.controller')
const DocGiaController = require('../controllers/docgia.controller')
const {verifyTokenStaff} = require('../middlewares/verifyToken')
// nếu có thời gian thiết kế route lại theo chuẩn RESTful 
router.post('/users/login', xacThucController.login)
    .post('/users/register', xacThucController.register)
    .patch('/users/:id', xacThucController.updateUser)
    .patch('/users/changePassword/:id', xacThucController.changePasswordForUser)
    .post('/staffs/login', xacThucController.staffLogin)
    .post('/staffs/register', xacThucController.staffRegister)
    .patch('/staffs/:id', xacThucController.updateStaff)
    .patch('/staffs/changePassword/:id', xacThucController.changePasswordForAdmin)
    .post('/logout', xacThucController.logout)
    .get('/readers',verifyTokenStaff, DocGiaController.getAllDocGia)

module.exports = router