const nhaXuatBanModel = require('../models/nhaxuatban.model')

module.exports = class PublisherService{
    async find(dieukien){
        const result = await nhaXuatBanModel.find(dieukien)
        const nxbCount = await nhaXuatBanModel.countDocuments()
        return {
            count: nxbCount,
            nhaxuatban: result,
            message: 'Lấy nhà xuất bản thành công.'
        }
    }
    async findByName(name){
        const result = await nhaXuatBanModel.find({TENNXB: {$regex:new RegExp(name), $options: 'i'}})
        const nxbCount = await nhaXuatBanModel.countDocuments()
        return {
            count: nxbCount,
            nhaxuatban: result,
            message: 'Lấy nhà xuất bản thành công.'
        }
    }
    async addPublisher(data){
        const kiemtra = await nhaXuatBanModel.findOne({TENNXB: data.TENNXB, DIACHI: data.DIACHI})
        if(!kiemtra){
            const nhaXuatBan = new nhaXuatBanModel(data)
            await nhaXuatBan.save()
            return {
                nhaxuatbanmoi: nhaXuatBan,
                message: 'Thêm nhà xuất bản thành công.'
            }
        }else{
            return {
                message: 'Nhà xuất bản đã tồn tại.'
            }
        }
        
    }
    async updatePublisher(MaNXB, data){
        const kiemTra = await nhaXuatBanModel.findOne({
                MANXB: { $ne: MaNXB },
                TENNXB: { $regex: `^${data.TENNXB}$`, $options: 'i' },
                DIACHI: { $regex: `^${data.DIACHI}$`, $options: 'i' }
            })

        if(kiemTra){
            return {
                nhaxuatban: null,
                message: 'Nhà xuất bản tồn tại'
            }
        }
        const publisher = await nhaXuatBanModel.findOneAndUpdate(
            {
                MANXB: MaNXB
            },
            {
                $set: {
                    TENNXB: data.TENNXB,
                    DIACHI: data.DIACHI
                }
            },
            {
                new: true
            }
        )
        if(!publisher){
            return {
                nhaxuatban: null,
                message: 'Không tìm thấy nhà xuất bản để cập nhật'
            }
        }
        return {
            nhaxuatban: publisher,
            message: 'Cập nhật nhà xuất bản thành công'
        }
    }

    async deletePublisher(MaNXB){
        const result = await nhaXuatBanModel.findOneAndDelete({MANXB: MaNXB})
        return result
    }
    async deleteAllPublishers(){
        const result = await nhaXuatBanModel.deleteMany()
        return result.deletedCount
    }
}