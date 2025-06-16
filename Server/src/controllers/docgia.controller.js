const ApiError = require('../api-error')
const jwt = require('jsonwebtoken')
const UserService = require('../services/nguoidung.service')

function verifyToken(req, res) {
    const token = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1] // tách từ "Bearer <token>"
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'NhanB2203517', (error, staff) => {
            if(error || !staff.ChucVu){
                return reject('Không có quyền')
            }else{
                resolve(staff)
            }
        })
    })
}
//[GET] /readers
module.exports.getAllDocGia = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const userService = new UserService()
        const result = await userService.getAll()
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Lỗi khi lấy danh sách độc giả.'))
    }
}
module.exports.deleteOneUser = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const id = req.params.id
        const userService = new UserService()
        const result = await userService.deleteOneUser(id)
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Lỗi khi xóa độc giả.'))
    }
}