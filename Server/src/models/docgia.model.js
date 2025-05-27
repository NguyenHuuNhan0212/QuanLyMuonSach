const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const docGiaSchema = new mongoose.Schema(
    {
        MADOCGIA: {type: Number},
        HOLOT: {type: String, required: true},
        TEN: { type: String, required: true},
        NGAYSINH: {type: Date, required: true},
        PHAI: {type: String, required: true, enum: ['Nam', 'Nữ', 'Khác']},
        DIACHI: {type: String, required: true},
        DIENTHOAI: {type: String, required: true, match: /^[0-9]{10,11}$/},
        PASSWORD: {type: String, required: true},
        //
        EMAIL: {type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    }, 
    {
        timestamps: true,
        minimize: false,
        collection: 'DOCGIA'
    }
)
docGiaSchema.plugin(AutoIncrement, {inc_field: 'MADOCGIA', start_seq: 1000})
module.exports = mongoose.model('bangDocGia', docGiaSchema)