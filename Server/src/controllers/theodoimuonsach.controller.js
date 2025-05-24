module.exports.getAllForUser = (req, res) => {
    res.json({message: 'All Borrows For User'})
}
module.exports.getAllForAdmin = (req, res) => {
    res.json({message: 'All Borrows For Admin'})
}
module.exports.addBorrow = (req, res) => {
    res.json({ message: 'User Action Add Borrow'})
}
module.exports.updateBorrowForUser = (req, res) => {
    res.json({message: 'Admin Action Update Borrow'})
}
module.exports.deleteBorrowForUser = (req, res) => {
    res.json({message: 'User deleted a borrow'})
}
module.exports.deleteBorrowForAdmin = (req, res) => {
    res.json({message: 'Admin deleted a borrow'})
}
