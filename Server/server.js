const express = require('express')
const cors = require('cors')
const ApiError = require('./src/api-error')
const db = require('./src/config/KetNoiDB')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const xacThucRouter = require('./src/routes/xacthuc.route')
const sachRouter = require('./src/routes/sach.route')
const nhaXuatBanRouter = require('./src/routes/nhaxuatban.route')
const muonSachRouter = require('./src/routes/theodoimuonsach.route')

db(process.env.MONGO_URI)
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


app.get('/', (req, res) => {
    res.json({ message: "Welcome to book application"})
})

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