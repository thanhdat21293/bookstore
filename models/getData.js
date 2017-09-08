const db = require('./index')
class GetData {
    constructor (db) {
        this.db = db
    }

    home (req) {
        let page_current = Number(req.params.page)
        let start_row = page_current
        if(req.url === '/') {
            page_current = 1
            start_row = 1
        }
        const _total_rows = 'SELECT COUNT(id) FROM book_store;'  
        const _home = 'SELECT * FROM book_store LIMIT ${book_limit} OFFSET ${start_row};'
        const _category = `SELECT c.category, array_agg(c.category_child) AS category_child FROM (
            SELECT c1.id, c1.category, c2.category_child FROM(
                SELECT ca.id, ca.name AS category FROM category AS ca WHERE ca.parent = 0
            ) AS c1
            FULL OUTER JOIN (
                SELECT ca.id, ca.name AS category_child, ca.parent AS category_id FROM category AS ca WHERE ca.parent != 0
            ) AS c2
            ON c1.id = c2.category_id ORDER BY c1.id ASC
        ) AS c GROUP BY c.category;`

        const _category_book = 'SELECT category.name FROM category  WHERE parent = 0;'

        return db.task('data', function * (t) {
            const book_limit = 5   
            start_row = book_limit * (start_row -1)
            const home = yield t.any(_home, {
                book_limit: book_limit,
                start_row: start_row
            })
            const category = yield t.any(_category)
            const category_book = yield t.any(_category_book)
            const total_rows_tring = yield t.any(_total_rows)
            const total_rows = Number(total_rows_tring[0].count)
            const total_pages =  Math.ceil(total_rows / book_limit)
            return {
                home: home,
                category: category,
                category_book: category_book,
                pagination: {
                    total_pages: total_pages,
                    page_current: page_current
                }
            }
        })   
    }

    detail (name_field, file_render) {
        const _category =  `SELECT c.category, array_agg(c.category_child) AS category_child FROM (
                                SELECT c1.id, c1.category, c2.category_child FROM(
                                    SELECT ca.id, ca.name AS category FROM category AS ca WHERE ca.parent = 0
                                ) AS c1
                                FULL OUTER JOIN (
                                    SELECT ca.id, ca.name AS category_child, ca.parent AS category_id FROM category AS ca WHERE ca.parent != 0
                                ) AS c2
                                ON c1.id = c2.category_id ORDER BY c1.id ASC
                            ) AS c GROUP BY c.category;`
        const _category_book = 'SELECT category.name FROM category  WHERE parent = 0;'
        const _detail = `SELECT b.*, c.name AS category
                            FROM(
                                SELECT book.author, book.isnb, book.description, book.link_download, book.file_format, book.file_size,book.images, 
                                book.language, book.name AS name_book, book.pages, book.read_online, book.year, ca.parent, ca.name AS category_child
                                FROM book_store AS book 
                                JOIN category AS ca ON ca.id = book.id_category
                            ) AS b
                         JOIN category AS c ON c.id = b.parent;`

        return db.task('data', function * (t) {
            const detail =  yield t.any(_detail)
            const category = yield t.any(_category)
            const category_book = yield t.any(_category_book)
            return {
                detail: detail,
                category: category,
                category_book: category_book
            }
        })      
    }
}
module.exports = new GetData(db)