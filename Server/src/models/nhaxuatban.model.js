const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const nhaXuatBanSchema = new mongoose.Schema(
    {
        MANXB: {type: Number},
        TENNXB: {type: String, required: true},
        DIACHI: {type: String, required: true}
    },
    {
        timestamps: true,
        minimize: false,
        collection: 'NHAXUATBAN'
    }
)
nhaXuatBanSchema.plugin(AutoIncrement, {inc_field: 'MANXB', start_seq: 1000})
module.exports = mongoose.model('bangNhaXuatBan', nhaXuatBanSchema)