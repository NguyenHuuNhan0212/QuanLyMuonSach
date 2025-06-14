const nguoiDungModel = require('../models/docgia.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = class UserService{
    async register(data){
        const kiemTraUser = await nguoiDungModel.exists({$or: [{DIENTHOAI: data.DIENTHOAI}, {EMAIL: data.EMAIL}]})
        if(!kiemTraUser){
            try{
                const hashedPassword = await bcrypt.hash(data.PASSWORD, 10)
                const userNew = new nguoiDungModel(
                    {
                        HOLOT: data.HOLOT,
                        TEN: data.TEN,
                        NGAYSINH: data.NGAYSINH,
                        PHAI: data.PHAI,
                        DIACHI: data.DIACHI,
                        DIENTHOAI: data.DIENTHOAI,
                        PASSWORD: hashedPassword,
                        EMAIL: data.EMAIL
                    }
                )
                await userNew.save()
                return { message: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập để sử dụng.'}
            }catch(err){
                return {message: err}
            }
        }else{
            return {message: 'Số điện thoại/Email đã tồn tại!'}
        }
    }

    async login(user){
        if(!user || !user.DIENTHOAI || !user.PASSWORD){
            return { message: 'Vui lòng nhập thông tin đăng nhập!'}
        }
        try{
            const kiemTraUser = await nguoiDungModel.findOne({DIENTHOAI: user.DIENTHOAI})
            if(!kiemTraUser){
                return {message: 'Số điện thoại chưa đăng ký tài khoản!'}
            }
            const isMatch = await bcrypt.compare(user.PASSWORD, kiemTraUser.PASSWORD)
            if(!isMatch){
                return {message: 'Mật khẩu không đúng!'}
            }
            const {PASSWORD, ...infoUser} = kiemTraUser._doc
            const token = jwt.sign(infoUser, process.env.JWT_SECRET || 'NhanB2203517', {expiresIn: '1h'})
            return {
                data: {
                    user: infoUser,
                    token: token
                },
                message: 'Đăng nhập thành công!'
            }
        }catch(err){
            return { message: 'Có lỗi trong quá trình đăng nhập!'}
        }
    }
    // cập nhật thông tin người dùng theo ID
    async updateUser(id, data){
        try{
            const user = await nguoiDungModel.findById(id)
            if(!user){
                return {message: 'Người dùng không tồn tại!'}
            }
           // Kiểm tra email hoặc sdt đã tồn tại ở người dùng khác chưa
            const existed = await nguoiDungModel.findOne({
                _id: { $ne: id }, // ngoại trừ chính nó
                $or: [
                    { EMAIL: data.EMAIL },
                    { DIENTHOAI: data.DIENTHOAI }
                ]
            });

            if (existed) {
                return { message: 'Email hoặc số điện thoại đã được sử dụng bởi người dùng khác!' }
            }

            if(data.PASSWORD){
                data.PASSWORD = await bcrypt.hash(data.PASSWORD, 10)
            }
            const updatedUser = await nguoiDungModel.findByIdAndUpdate(id, data, {new: true})
            return {data: updatedUser, message: 'Cập nhật thông tin thành công!'}
        }catch(err){
            return {message: err.message}
        }
    }
    async changePassword(id, password, newPassword){
        const user = await nguoiDungModel.findById(id)
        if(!user){
            return { message: 'Người dùng không tồn tại.'}
        }else{
            const isMatch = await bcrypt.compare(password, user.PASSWORD)
            if(!isMatch){
                return { message: 'Mật khẩu cũ không đúng.'}
            }
            const hashesedNewPassword = await bcrypt.hash(newPassword, 10)
            user.PASSWORD = hashesedNewPassword
            await user.save()
            return { message: 'Đổi mật khẩu thành công.'}
        }
    }
}