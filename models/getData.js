const db = require('./index')
class GetData {
    constructor (db) {
        this.db = db
    }


    home () {
        const _home = 'SELECT * FROM bookstore;'
        // const _category = `SELECT c.id, c.name,
        //                         (array(
        //                             SELECT json_build_object('name', ca.name, 'id', ca.id) 
        //                             FROM category AS ca
        //                             WHERE ca.parent = c.id)
        //                         ) AS cat_child
        //                     FROM category as c
        //                     WHERE parent = 0`

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
            const home = yield t.any(_home)
            const category = yield t.any(_category)
            const category_book = yield t.any(_category_book)
            return {
                home: home,
                category: category,
                category_book: category_book
            }
        })     
    }
    // category(id){
    //     let category_get = 'SELECT * FROM category WHERE parent = $1'
    //     //let category_detail = "SELECT * FROM category,bookstore WHERE category.id = bookstore.id_category AND category.id IN (${ids})"
    //     let cat_id = 'SELECT * FROM category,bookstore WHERE category.id = bookstore.id_category AND category.id = $1'
    //     const _category = `SELECT c.id, c.name,
    //         (array(
    //             SELECT json_build_object('name', ca.name, 'id', ca.id) 
    //             FROM category AS ca
    //             WHERE ca.parent = c.id)
    //         ) AS cat_child
    //     FROM category as c
    //     WHERE parent = 0`
    //     const _category_book = 'SELECT * FROM category  WHERE parent = 0'

    //     return db.task(t => {
    //         return t.any(category_get, id)
    //             .then(cat => {
    //                 if(cat.length > 0) {
    //                     console.log(1)
    //                     let arr_id_cat = ''
    //                     let count = 0
    //                     cat.map(cate => {
    //                         count++
    //                         if(count === 1){
    //                             arr_id_cat += cate.id
    //                         }else{
    //                             arr_id_cat += ',' + cate.id
    //                         }
    //                     })
    //                     return db.task('data', function * (t) {
    //                         const home = yield t.any(`SELECT * FROM category,bookstore WHERE category.id = bookstore.id_category AND category.id IN (${arr_id_cat})`)
    //                         const category = yield t.any(_category)
    //                         const category_book = yield t.any(_category_book)
    //                         return {
    //                             home: home,
    //                             category: category,
    //                             category_book: category_book
    //                         }
    //                     }) 
    //                 }else{
    //                     return db.task('data', function * (t) {
    //                         const home = yield t.any(cat_id,id)
    //                         const category = yield t.any(_category)
    //                         const category_book = yield t.any(_category_book)
    //                         return {
    //                             home: home,
    //                             category: category,
    //                             category_book: category_book
    //                         }
    //                     })    
    //                 }
                    
    //             })
    //     })
    // }

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
                                FROM bookstore AS book 
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