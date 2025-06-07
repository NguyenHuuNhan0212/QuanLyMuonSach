const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const theoDoiMuonSachSchema = new mongoose.Schema(
    {
        MAMUONSACH: {type: Number},
        MADOCGIA: {type: mongoose.Schema.Types.ObjectId, ref: 'bangDocGia', required: true},
        MASACH: {type: mongoose.Schema.Types.ObjectId, ref: 'bangSach', required: true},
        MSNV: {type: mongoose.Schema.Types.ObjectId, ref: 'bangNhanVien'},
        NGAYMUON: {type: Date},
        NGAYTRA: {type: Date},
        SoLuongMuon: {type: Number, required: true, default: 1},
        TrangThai: { type: String, required: true, default: 'Chờ lấy'}// dự kiến có 3 trạng thái đã lấy, chờ lấy, đã trả
    },
    {
        timestamps: true,
        minimize: false,
        collection: 'THEODOIMUONSACH'
    }
)
theoDoiMuonSachSchema.plugin(AutoIncrement, {inc_field: 'MAMUONSACH', start_seq: 100})
module.exports = mongoose.model('bangTheoDoiMuonSach', theoDoiMuonSachSchema)