const ApiError = require('../api-error')
const jwt = require('jsonwebtoken')
const BorrowBook = require('../services/theodoimuonsach.service')

// Xác thực người dùng
function verifyTokenUser(req, res){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'NhanB2203517', (error, user) => {
            if(error){
                return reject('Không có quyền')
            }else{
                return resolve(user)
            }
        })
    })
}
// Xác thực nhân viên
function verifyTokenStaff(req, res){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'NhanB2203517', (error, staff) => {
            if(error || !staff.ChucVu){
                return reject('Không có quyền')
            }else{
                return resolve(staff)
            }
        })
    })
}
//[GET] /borrows/
module.exports.getAllForUser = async  (req, res, next) => {
    try{
        const docgia = await verifyTokenUser(req, res)
        const borrowBook = new BorrowBook()
        const result = await borrowBook.getAllForUser(docgia._id)
        if(!result || !result.danhsachmuon.length){
            return res.status(404).json({message: `Chưa có dữ liệu mượn sách từ độc giả có mã số ${docgia.MADOCGIA}`})
        }
        return res.json(result)
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi lấy danh sách mượn từ người dùng'))
        }
    }
}
//[GET] /borrows/admin
module.exports.getAllForAdmin = async (req, res, next) => {
    try{
        await verifyTokenStaff(req, res)
        const borrowBook = new BorrowBook()
        const result = await borrowBook.getAllForAdmin()
        if(!result || !result.danhsachmuon.length ){
            return res.status(404).json({message: 'Chưa có dữ liệu mượn sách'})
        }
        return res.json(result)
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi lấy danh sách mượn từ admin.'))
        }
    }
}
//[POST] /borrows/
module.exports.addBorrow = async (req, res, next) => {
    try{
        const docgia = await verifyTokenUser(req, res)
        const borrowBook = new BorrowBook()
        const result = await borrowBook.addBorrow(req.body, docgia._id)
        if(result) {
            return res.json(result)
        }
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi độc giả đăng ký mượn sách.'))
        }
    }
}
//[PATCH] /borrows/:muonId
module.exports.updateBorrowForAdmin = async (req, res, next) => {
    try{
        const staff = await verifyTokenStaff(req, res)
        const muonId = req.params.muonId
        const borrowBook = new BorrowBook()
        const result = await borrowBook.updateBorrowForAdmin(req.body, muonId, staff._id)
        if(result){
            return res.json(result)
        }
    }catch(err) {
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi Admin cập nhật mượn sách.'))
        }
    }
}
//[POST] /users/:muonId
module.exports.deleteBorrowForUser = async (req, res, next) => {
    try{
        await verifyTokenUser(req, res)
        const muonId = req.params.muonId
        const borrowBook = new BorrowBook()
        const result = await borrowBook.deleteBorrowForUser(muonId)
        if(result){
            return res.json(result)
        }
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi độc giả hủy đăng ký mượn sách.'))
        }
    }
}
//[POST] /admin/:muonId
module.exports.deleteBorrowForAdmin = async (req, res, next) => {
    try{
        await verifyTokenStaff(req, res)
        const muonId = req.params.muonId
        const borrowBook = new BorrowBook()
        const result = await borrowBook.deleteBorrowForAdmin(muonId)
        if(result){
            return res.json(result)
        }
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi Admin xóa mượn sách.'))
        }
    }   
}
