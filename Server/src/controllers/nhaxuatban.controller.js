module.exports.getAll = (req, res) => {
    res.json({message: 'Get all publisher'})
}
module.exports.addPublisher = (req, res) => {
    res.json({message: 'Add a Publisher'})
}
module.exports.updatePublisher = (req, res) => {
    res.json({ message: 'Update success'})
}
module.exports.deletePublisher = (req, res) => {
    res.json({ message: 'Deleted a Publisher'})
}
module.exports.deleteAllPublishers = (req, res) => {
    res.json({ message: 'Deleted All Publishers'})
}