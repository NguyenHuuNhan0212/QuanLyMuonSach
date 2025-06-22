const muonSachModel = require('../models/theodoimuonsach.model')
const sachModel = require('../models/sach.model')
const nodemailer = require('nodemailer')
require('dotenv').config()

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
            .populate('MADOCGIA', 'HOLOT EMAIL TEN PHAI NGAYSINH DIACHI DIENTHOAI')
            .populate('MASACH')
            .populate('MSNV', 'HoTenNV ChucVu SoDienThoai DiaChi')
        const muonsachCount = await muonSachModel.countDocuments()
        const sachDangLay = await muonSachModel.find({
            TrangThai: 'Đã lấy'
        })
        let tongSoLuong = 0;
        for(const sach of sachDangLay) {
            tongSoLuong += sach.SoLuongMuon || 0;
        }
        return {
            soQuyenSachDangBiLay: tongSoLuong,
            count: muonsachCount,
            danhsachmuon: result,
            message: 'Lấy thông tin mượn sách thành công.'
        }
    }
    async sendEmailToUser(muonId, email){
        const muon = await muonSachModel.findById(muonId)
            .populate('MASACH')
        const today = new Date();
        const twoDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

        const dd = String(twoDaysLater.getDate()).padStart(2, '0');
        const mm = String(twoDaysLater.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const yyyy = twoDaysLater.getFullYear();

        const formattedDate = `${dd}/${mm}/${yyyy}`;

        if(!muon){
            return { err: 'Không tìm thấy thông tin mượn sách.'}
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: `"Thư viện trực tuyến"<${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Thông tin mượn sách',
            html: `<h4>Thông tin mượn sách</h4>
            <p>Xin chào,</p>
            <p>Bạn đã đăng ký mượn quyển sách có tên <b>"${muon.MASACH.TENSACH}"</b> với số lượng ${muon.SoLuongMuon}.</p>
            <p>Bạn vui lòng đến thư viện để nhận sách trong vòng từ hôm nay đến hết ngày <b style="color: red">${formattedDate}</b>.</p>`
        }
        try{
            await transporter.sendMail(mailOptions)
            return {message: 'Email đã được gửi thành công!'}
        }catch(err){
            return {message: 'Gửi email thất bại!'}
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
           //lấy thông tin nguời dùng để gửi email
            const docgia = await muonSachModel.findById(borrowNew._id).populate('MADOCGIA', 'EMAIL')
            if(!docgia || !docgia.MADOCGIA || !docgia.MADOCGIA.EMAIL){
                await muonSachModel.findByIdAndDelete(borrowNew._id)
                return {message: 'Không tìm thấy thông tin người dùng để gửi email.'}
            }
            await this.sendEmailToUser(borrowNew._id, docgia.MADOCGIA.EMAIL)
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
    async deleteBorrowForAdmin(muonId) {
        const borrow = await muonSachModel.findById(muonId);

        if (!borrow) {
            return {
                message: 'Không tồn tại phiếu mượn.'
            };
        }

        if (borrow.TrangThai === 'Chờ lấy') {
            return {
                message: 'Bạn không được phép xóa phiếu mượn khi đang trong trạng thái chờ lấy.'
            };
        }
        if (borrow.TrangThai === 'Đã lấy') {
            return {
                message: 'Người dùng chưa trả sách không được phép xóa phiếu mượn.'
            };
        }

        const deleted = await muonSachModel.findByIdAndDelete(muonId);

        return {
            muon: deleted,
            message: 'Xóa phiếu mượn thành công.'
        };
    }

    async updateBorrowForAdmin(data, muonId, nhanVienId){
        let kiemTra = await muonSachModel.findOne({_id: muonId})
        if(!kiemTra){
            return {message: 'Không tìm thấy thông tin mượn sách.'}
        }else if(kiemTra.TrangThai === data.TrangThai){
            return {message: 'Trạng thái mượn sách không thay đổi.'}
        }
        if (kiemTra.TrangThai === 'Đã lấy' && data.TrangThai === 'Chờ lấy') {
            return { message: 'Không thể chuyển từ "Đã lấy" về "Chờ lấy".' };
        }
        if (kiemTra.TrangThai === 'Đã trả' && (data.TrangThai === 'Chờ lấy' || data.TrangThai === 'Đã lấy')) {
            return { message: 'Sách đã được trả. Không thể cập nhật lại trạng thái.' };
        }
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
            const sach = await sachModel.findById(muon.MASACH)
            if(sach) {
                await sachModel.findByIdAndUpdate(muon.MASACH, {
                    $set: {
                        SoLuotMuon: sach.SoLuotMuon + muon.SoLuongMuon
                    }
                })
            }
             const chiTietMuon = await muonSachModel.findOne({ _id: muonId})
                .populate('MASACH')
                .populate('MADOCGIA', 'HOLOT TEN NGAYSINH EMAIL PHAI DIACHI DIENTHOAI')
                .populate('MSNV', 'HoTenNV ChucVu DiaChi SoDienThoai')
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
                    .populate('MADOCGIA', 'HOLOT TEN NGAYSINH EMAIL PHAI DIACHI DIENTHOAI')
                    .populate('MSNV', 'HoTenNV ChucVu DiaChi SoDienThoai')
            return {
                muon: chiTietMuon,
                message: 'Cập nhật thành công.'
            }

        }
    }
}