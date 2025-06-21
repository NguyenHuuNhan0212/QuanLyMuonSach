const express = require('express')
const cors = require('cors')
const ApiError = require('./src/api-error')
const db = require('./src/config/KetNoiDB')
const path = require('path')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const xacThucRouter = require('./src/routes/xacthuc.route')
const sachRouter = require('./src/routes/sach.route')
const nhaXuatBanRouter = require('./src/routes/nhaxuatban.route')
const muonSachRouter = require('./src/routes/theodoimuonsach.route')
const uploadRouter = require('./src/routes/upload.route')

db(process.env.MONGO_URI)
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))


app.get('/', (req, res) => {
    res.json({ message: "Welcome to book application"})
})


// Thêm vào
app.use('/upload', uploadRouter)
app.use('/', xacThucRouter)
app.use('/books', sachRouter)
app.use('/publishers', nhaXuatBanRouter)
app.use('/borrows', muonSachRouter)
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})