const express = require('express')
const router = express.Router()
const xacThucController = require('../controllers/xacthuc.controller')

// nếu có thời gian thiết kế route lại theo chuẩn RESTful 
router.post('/users/login', xacThucController.login)
    .post('/users/register', xacThucController.register)
    .patch('/users/:id', xacThucController.updateUser)
    .post('/staffs/login', xacThucController.staffLogin)
    .post('/staffs/register', xacThucController.staffRegister)
    .post('/logout', xacThucController.logout)

module.exports = router