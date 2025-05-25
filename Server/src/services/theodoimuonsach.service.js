const muonSachModel = require('../models/theodoimuonsach.model')
const sachModel = require('../models/sach.model')

module.exports = class BorrowBook{
    async getAllForUser(MaDocGia){
        const result = await muonSachModel.find({MADOCGIA: MaDocGia}).populate('MASACH')
        return {
            danhsachmuon: result,
            message: 'Lấy thông tin mượn sách của bạn thành công.'
        }
    }
    async getAllForAdmin(){
        const result = await muonSachModel.find({})
            .populate('MADOCGIA', 'HOLOT TEN PHAI NGAYSINH DIACHI DIENTHOAI')
            .populate('MASACH')
            .populate('MSNV', 'HoTenNV ChucVu SoDienThoai')
        return {
            danhsachmuon: result,
            message: 'Lấy thông tin mượn sách thành công.'
        }
    }
    async addBorrow(data, docgiaId){
        const borrowNew = new muonSachModel({
            MADOCGIA: docgiaId,
            MASACH: data.MASACH,
            SoLuongMuon: data.SoLuongMuon,
        })
        await borrowNew.save()
        if(borrowNew){
            const sach = await sachModel.findById(data.MASACH)
            await sachModel.findByIdAndUpdate(data.MASACH, {
                $set: {
                    SoLuongDaMuon: sach.SoLuongDaMuon + borrowNew.SoLuongMuon
                }
            })
            console.log(`Bạn đã đăng ký mượn quyển sách có tên ${sach.TENSACH}`)
        }
        return {
            muon: borrowNew,
            message: 'Đăng ký mượn sách thành công!'
        }
    }
    async deleteBorrowForUser(muonId){
        const borrowDelete = await muonSachModel.findOneAndDelete({_id: muonId, TrangThai: 'Chờ lấy'})
        if(borrowDelete){
            const sach = await sachModel.findById(borrowDelete.MASACH)
            await sachModel.findByIdAndUpdate(borrowDelete.MASACH, {
                $set: {
                    SoLuongDaMuon: sach.SoLuongDaMuon - borrowDelete.SoLuongMuon
                }
            })
            return {
                muon: borrowDelete,
                message: 'Hủy mượn sách thành công.'
            }
        }
        return {
            message: 'Chỉ hủy được khi chưa nhận sách.'
        }
    }
    async deleteBorrowForAdmin(muonId){
        const borrowDelete = await muonSachModel.findOneAndDelete({_id: muonId})
        if(borrowDelete){
            if(borrowDelete.TrangThai != 'Đã trả'){
                const sach = await sachModel.findById(borrowDelete.MASACH)
                await sachModel.findByIdAndUpdate(borrowDelete.MASACH, {
                    $set: {
                        SoLuongDaMuon: sach.SoLuongDaMuon - borrowDelete.SoLuongMuon
                    }
                })
            }
        }
        return {
            muon: borrowDelete,
            message: 'Xóa mượn sách thành công'
        }
    }
    async updateBorrowForAdmin(data, muonId, nhanVienId){
        if(data.TrangThai == "Đã lấy"){
            const muon = await muonSachModel.findOneAndUpdate(
                {
                    _id: muonId
                }, 
                {
                    $set: {
                        TrangThai: data.TrangThai,
                        MSNV: nhanVienId,
                        NGAYMUON: Date.now()
                    }
                },
                {
                    new: true
                }
            )
             const chiTietMuon = await muonSachModel.findOne({ _id: muonId})
                .populate('MASACH')
                .populate('MADOCGIA', 'HOLOT TEN NGAYSINH PHAI DIACHI DIENTHOAI')
                .populate('MSNV', 'HoTenNV ChucVu SoDienThoai')
            return {
                muon: chiTietMuon,
                message: 'Cập nhật thành công.'
            }
        }else if(data.TrangThai == "Đã trả"){
            const muon = await muonSachModel.findByIdAndUpdate(muonId,
                {
                    $set: {
                        TrangThai: data.TrangThai,
                        MSNV: nhanVienId,
                        NGAYTRA: Date.now()
                    }
                },
                {
                    new: true
                }
            )
            const sach = await sachModel.findById(muon.MASACH)
            await sachModel.findByIdAndUpdate(muon.MASACH, 
                {
                    $set: {
                        SoLuongDaMuon: sach.SoLuongDaMuon - muon.SoLuongMuon
                    }
                }
            )
            const chiTietMuon = await muonSachModel.findById(muonId)
                    .populate('MASACH')
                    .populate('MADOCGIA', 'HOLOT TEN NGAYSINH PHAI DIACHI DIENTHOAI')
                    .populate('MSNV', 'HoTenNV ChucVu SoDienThoai')
            return {
                muon: chiTietMuon,
                message: 'Cập nhật mượn sách thành công.'
            }

        }
    }
}