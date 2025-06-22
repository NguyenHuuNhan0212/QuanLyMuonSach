const jwt = require('jsonwebtoken')

// Middleware xác thực người dùng (độc giả)
function verifyTokenUser(req, res, next) {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json({ message: 'Không có token.' })

    jwt.verify(token, process.env.JWT_SECRET || 'NhanB2203517', (err, user) => {
        if (err) return res.status(401).json({ message: 'Không có quyền' })
        req.user = user
        next()
    })
}

// Middleware xác thực nhân viên (staff)
function verifyTokenStaff(req, res, next) {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json({ message: 'Không có token.' })

    jwt.verify(token, process.env.JWT_SECRET || 'NhanB2203517', (err, staff) => {
        if (err || !staff.ChucVu) {
            return res.status(401).json({ message: 'Không có quyền' })
        }
        req.staff = staff
        next()
    })
}

module.exports = {
    verifyTokenUser,
    verifyTokenStaff,
}
