module.exports.search = function (router) {
    const db = require('../models/index')
    router.post('/search', (req, res) => {
        const key_search = `SELECT b.*, c.name AS category
                                FROM(
                                    SELECT book.author, book.isnb, book.description, book.link_download, book.file_format, book.file_size,book.images, 
                                    book.language, book.name AS name_book, book.pages, book.read_online, book.year, ca.parent, ca.name AS category_child
                                    FROM book_store AS book 
                                    JOIN category AS ca ON ca.id = book.id_category
                                ) AS b
                            JOIN category AS c ON c.id = b.parent;`
        // res.send(req.body)
    })
}