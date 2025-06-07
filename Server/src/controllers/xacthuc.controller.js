const ApiError = require('../api-error')
const UserService = require('../services/nguoidung.service')
const StaffService = require('../services/nhanvien.service')

//[POST] /users/register
module.exports.register = async (req, res, next) => {
    try{
        const data = req.body
        const userService = new UserService()
        const result = await userService.register(data)
        return res.status(200).json({
            message: result.message
        })
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Có lỗi khi đăng ký.'))
    }
}
//[POST] /users/login
module.exports.login = async  (req, res, next) => {
    try{
        const userService = new UserService()
        const data = req.body
        const result = await userService.login(data)
        return res.status(200).json(result) 
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Có lỗi khi đăng nhập!'))
    }
}
//[POST] /staffs/register
module.exports.staffRegister = async (req, res, next) => {
    try{
        const data = req.body
        const staffService = new StaffService()
        const result = await staffService.register(data)
        return res.status(200).json({message: result.message})
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Lỗi khi nhân viên đăng ký.'))
    }
}
//[POST] /staffs/login
module.exports.staffLogin = async (req, res, next) => {
    try{
        const data = req.body
        const staffService = new StaffService();
        const result = await staffService.login(data)
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Lỗi khi nhân viên đăng nhập.'))
    }
}
//[POST] /logout
module.exports.logout =  (req, res, next) => {
    try{
        return res.status(200).json({ message: 'Đăng xuất thành công!'})
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Có lỗi khi đăng xuất!'))
    }
}
//[PATCH] /users/:id
module.exports.updateUser = async (req, res, next) => {
    try{
        const id = req.params.id
        const data = req.body
        const userService = new UserService()
        const result = await userService.updateUser(id, data)
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Có lỗi khi cập nhật thông tin người dùng!'))
    }
}