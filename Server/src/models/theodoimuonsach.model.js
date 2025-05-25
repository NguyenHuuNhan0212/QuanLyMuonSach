const mongoose = require('mongoose')

const theoDoiMuonSachSchema = new mongoose.Schema(
    {
        MADOCGIA: {type: mongoose.Schema.Types.ObjectId, ref: 'bangDocGia', required: true},
        MASACH: {type: mongoose.Schema.Types.ObjectId, ref: 'bangSach', required: true},
        MSNV: {type: mongoose.Schema.Types.ObjectId, ref: 'bangNhanVien'},
        NGAYMUON: {type: Date, required: true, default: Date.now },
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
module.exports = mongoose.model('bangTheoDoiMuonSach', theoDoiMuonSachSchema)