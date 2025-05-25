const ApiError = require('../api-error')
const jwt = require('jsonwebtoken')
const BookService = require('../services/sach.service')

function verifyToken(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
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
//[GET] /books/
module.exports.getAll = async (req, res, next) => {
    try{
        const bookService = new BookService()
        const result = await bookService.getAll()
        return res.json(result)
    }catch(err){
        console.log(err)
        return next(new ApiError(500, 'Lỗi khi lấy tất cả sách.'))
    }
}
//[POST] /books/
module.exports.addBook = async (req, res, next) => {
    const required = ['TENSACH', 'DONGIA', 'SOQUYEN', 'NAMXUATBAN', 'MANXB', 'TACGIA']
    const missing = required.filter(field => !req.body[field])
    if(missing.length > 0){
        return next(new ApiError(400, 'Điền đầy đủ thông tin để thêm sách.'))
    }
    try{
        await verifyToken(req, res)
        const sach = req.body
        const bookService = new BookService()
        const result = await bookService.addBook(sach)
        return res.json(result)
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi thêm sách.'))
        }
    }
}
//[PATCH] /books/:MaSach
module.exports.updateBook = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const data = req.body
        const bookService = new BookService()
        const sachUpdate = await bookService.updateBook(req.params.MaSach, data)
        return res.json(sachUpdate)
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi cập nhật.'))
        }
    }
}
//[DELETE] /books/:MaSach
module.exports.deleteBook = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const maSach = req.params.MaSach
        const bookService = new BookService()
        const result = await bookService.deleteBook(maSach)
        if(!result) {
            return next(new ApiError(400, 'Không tìm thấy sách.'))
        }
        return res.json({
            result,
            message: `Xóa sách có MASACH là ${maSach} thành công.`
        })
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi xóa sách.'))
        }
    }
}
//[DELETE] /books/
module.exports.deleteAllBook = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const bookService = new BookService()
        const deletedCount = await bookService.deleteAllBook()
        return res.json({
            message: `${deletedCount} quyển sách được xóa thành công.`
        })
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else {
            return next(new ApiError(500, 'Có lỗi khi xóa tất cả sách'))
        }
    }
}