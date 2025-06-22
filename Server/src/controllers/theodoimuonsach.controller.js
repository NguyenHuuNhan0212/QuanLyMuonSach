const ApiError = require('../api-error')
const BorrowBook = require('../services/theodoimuonsach.service')


//[GET] /borrows/
module.exports.getAllForUser = async  (req, res, next) => {
    try{
        const docgia = req.user
        const borrowBook = new BorrowBook()
        const result = await borrowBook.getAllForUser(docgia._id)
        if(!result || !result.danhsachmuon.length){
            return res.status(200).json({message: `Chưa có dữ liệu mượn sách từ độc giả có mã số ${docgia.MADOCGIA}`})
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
        const docgia = req.user
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
        const staff = req.staff
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
