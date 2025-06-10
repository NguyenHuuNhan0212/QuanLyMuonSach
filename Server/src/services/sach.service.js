const sachModel = require('../models/sach.model')

module.exports = class BookService{
    async getAll(){
        const data = await sachModel.find().populate('MANXB')
        const sachCount = await sachModel.countDocuments()
        return {
            count: sachCount,
            sach: data,
            message: 'Lấy tất cả sách thành công'
        }
    }

    async addBook(data){
       const kiemTra = await sachModel.findOne({TENSACH: data.TENSACH})
       if(!kiemTra){
        const sachNew = new sachModel(data)
        const sachSave = await sachNew.save()
        const result = await sachSave.populate('MANXB')
        return {
            sach: result,
            message: 'Thêm sách thành công.'
        }
       }else{
        return { 
            message: 'Sách đã tồn tại.'
        }
       }
    }
    async updateBook(MaSach, data){
        const updateSach = await sachModel.findOneAndUpdate(
            {
                MASACH: MaSach
            },
            {
                $set: {
                    TENSACH: data.TENSACH,
                    DONGIA: data.DONGIA,
                    SOQUYEN: data.SOQUYEN,
                    NAMXUATBAN: data.NAMXUATBAN,
                    MANXB: data.MANXB,
                    TACGIA: data.TACGIA,
                    image: data.image
                }
            },
            {new: true}
        )
        if(!updateSach) {
            return {message: 'Không tìm thấy sách cần cập nhật'}
        }
        await updateSach.populate('MANXB')
        return {
            sach: updateSach,
            message: 'Cập nhật sách thành công.'
        }

    }
    async deleteBook(maSach){
        const sachDelete = await sachModel.findOneAndDelete({MASACH: maSach})
        return {
            sachDelete,
            message: `Xóa sách thành công.`
        }
    }
    async deleteAllBook(){
        const result = await sachModel.deleteMany()
        return result.deletedCount
    }
}