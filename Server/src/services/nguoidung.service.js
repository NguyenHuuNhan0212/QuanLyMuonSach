const nguoiDungModel = require('../models/docgia.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = class UserService{
    async register(data){
        console.log("Dữ liệu nhận được:", data)
        const kiemTraUser = await nguoiDungModel.exists({DIENTHOAI: data.DIENTHOAI})
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
                        PASSWORD: hashedPassword
                    }
                )
                await userNew.save()
                return { message: 'Đăng ký tài khoản thành công!'}
            }catch(err){
                return {message: err}
            }
        }else{
            return {message: 'Số điện thoại đã tồn tại!'}
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
}