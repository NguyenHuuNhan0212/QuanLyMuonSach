module.exports.getAll = (req, res) => {
    res.json({message: 'Get All Books'})
}
module.exports.addBook = (req, res) => {
    res.json({ message: 'Add Books'})
}
module.exports.updateBook = (req, res) => {
    res.json({ message: 'Update book'})
}
module.exports.deleteBook = (req, res) => {
    res.json({ message: 'Deleted a book'})
}
module.exports.deleteAllBook = (req, res) => {
    res.json({ message: 'Deleted all books'})
}