const nhanVienModel = require('../models/nhanvien.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class StaffService{
    async register(data){
        const kiemTraStaff = await nhanVienModel.exists({SoDienThoai: data.SoDienThoai})
        if(!kiemTraStaff){
            try{
                const hashedPassword = await bcrypt.hash(data.Password, 10)
                const staffNew = new nhanVienModel({
                    HoTenNV: data.HoTenNV,
                    Password: hashedPassword,
                    ChucVu: data.ChucVu,
                    DiaChi: data.DiaChi,
                    SoDienThoai: data.SoDienThoai
                })
                await staffNew.save()
                return { message: 'Đăng ký tài khoản nhân viên thành công!'}
            }catch(err){
                return { message: err}
            }
        }else{
            return { message: 'Số điện thoại đã tồn tại!'}
        }
    }
    async login(staff){
        if(!staff || !staff.SoDienThoai || !staff.Password){
            return {message: 'Nhập đầy đủ thông tin để đăng nhập!'}
        }
        try{
            const kiemTraStaff = await nhanVienModel.findOne({SoDienThoai: staff.SoDienThoai})
            if(!kiemTraStaff){
                return { message: 'Số điện thoại chưa đăng ký tài khoản nhân viên!'}
            }
            const isMatch = await bcrypt.compare(staff.Password, kiemTraStaff.Password)
            if(!isMatch){
                return {message: 'Mật khẩu không đúng'}
            }

            const {Password, ...infoStaff} = kiemTraStaff._doc
            const token = jwt.sign(infoStaff, process.env.JWT_SECRET || 'NhanB2203517', {expiresIn: '1h'})
            return {
                data: {
                    staff: infoStaff,
                    token: token
                },
                message: 'Đăng nhập thành công!'
            }
        }catch(err){
            return {mesage: 'Lỗi khi đăng nhập!'}
        }
    }
    async staffUpdate(id, data){
        try{
            const kiemTra = await nhanVienModel.findById(id)
            if(!kiemTra){
                return {
                    message: 'Nhân viên không tồn tại'
                }
            }
            if(data.Password){
                data.Password = await bcrypt.hash(data.Password, 10)
            }
            const staffUpdate = await nhanVienModel.findByIdAndUpdate(id,data, {new: true})
            return {
                data: staffUpdate,
                message: 'Cập nhật thành công.'
            }
        }catch(err){
            return { message: 'Có lỗi khi cập nhật.'}
        }
    }
}