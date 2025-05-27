const ApiError = require('../api-error')
const jwt = require('jsonwebtoken')
const PublisherService = require('../services/nhaxuatban.service')

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
//[GET] /publishers/
module.exports.getAll = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const publisherService = new PublisherService()
        const {TENNXB} = req.query
        const result = TENNXB ? await publisherService.findByName(TENNXB) : await publisherService.find()
        return res.json(result)
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else{
            return next(new ApiError(500, 'Lỗi khi lấy nhà xuất bản.'))
        }
    }
}
//[POST] /publishers/
module.exports.addPublisher = async (req, res, next) => {
    if(!req.body.TENNXB || !req.body.DIACHI){
        return next(new ApiError(400, 'Điền đầy đủ thông tin để thêm nhà xuất bản.'))
    }
    try{
        await verifyToken(req, res)
        const data = req.body
        const publisherService = new PublisherService()
        const result = await publisherService.addPublisher(data)
        return res.json(result)
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else {
            return next(new ApiError(500, 'Lỗi khi thêm nhà xuất bản.'))
        }
    }
}
//[PATCH] /publishers/:MaNXB
module.exports.updatePublisher = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const publisherService = new PublisherService()
        const result = await publisherService.updatePublisher(req.params.MaNXB, req.body)
        return res.json(result)
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else {
            return next(new ApiError(500, 'Lỗi khi cập nhật nhà xuất bản.'))
        }
    }
}
module.exports.deletePublisher = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const MaNXB = req.params.MaNXB
        const publisherService = new PublisherService()
        const result = await publisherService.deletePublisher(MaNXB)
        if(!result){
            return next(new ApiError(401, 'Không tìm thấy nhà xuất bản.'))
        }
        return res.json({
            result,
            message: `Đã xóa thành công nhà xuất bản có MANXB là ${MaNXB}.`
        })
    }catch(err) {
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else {
            return next(new ApiError(500, 'Lỗi khi xóa 1 nhà xuất bản.'))
        }
    }
}
module.exports.deleteAllPublishers = async (req, res, next) => {
    try{
        await verifyToken(req, res)
        const publisherService = new PublisherService()
        const deletedCount = await publisherService.deleteAllPublishers()
        return res.json({
            message: `${deletedCount} nhà xuất bản đã được xóa thành công.`
        })
    }catch(err){
        console.log(err)
        if(err == 'Không có quyền'){
            return next(new ApiError(401, err))
        }else {
            return next(new ApiError(500, 'Lỗi khi xóa tất cả nhà xuất bản.'))
        }
    }
}