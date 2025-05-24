const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const nhanVienSchema = new mongoose.Schema(
    {
    MSNV: {type: Number},
    HoTenNV: {type: String, required: true},
    Password: {type: String, required: true},
    ChucVu: {type: String, required: true},
    DiaChi: {type: String, required: true},
    SoDienThoai: {type: String, required: true, match: /^[0-9]{10,11}$/}
    },
    {
        timestamps: true,
        minimize: false,
        collection: 'NhanVien'
    }
)
nhanVienSchema.plugin(AutoIncrement, { inc_field: 'MSNV', start_seq: 1000})
module.exports = mongoose.model('bangNhanVien', nhanVienSchema)