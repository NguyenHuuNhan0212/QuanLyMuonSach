const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const sachSchame = new mongoose.Schema(
    {
        MASACH: {type: Number},
        TENSACH: {type: String, required: true},
        DONGIA: {type: Number, required: true},
        SOQUYEN: {type: Number, required: true},
        NAMXUATBAN: {type: Number, required: true},
        MANXB: { type: mongoose.Schema.Types.ObjectId, ref: 'bangNhaXuatBan', required: true},
        TACGIA: {type: String, required: true},
        image: {type: String},
        SoLuongDaMuon: {type: Number, required: true, default: 0}
    },
    {
        timestamps: true,
        minimize: false,
        collection: 'SACH'
    }
)

sachSchame.plugin(AutoIncrement, {inc_field: 'MASACH', start_seq: 1000})
module.exports = mongoose.model('bangSach', sachSchame)