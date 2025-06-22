const ApiError = require('../api-error')
const UserService = require('../services/nguoidung.service')

//[GET] /readers
module.exports.getAllDocGia = async (req, res, next) => {
    try{
        const userService = new UserService()
        const result = await userService.getAll()
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Lỗi khi lấy danh sách độc giả.'))
    }
}