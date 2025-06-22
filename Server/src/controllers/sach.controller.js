const ApiError = require('../api-error')
const BookService = require('../services/sach.service')
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