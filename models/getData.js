const db = require('./index')
class GetData {
    constructor (db) {
      this.db = db
    }
    home () {
        // return this.getCategory()
        const _home = 'SELECT * FROM book_store;'
        const _category = 'SELECT ca.id, ca.name AS category ,array_agg(cb.name) AS category_book FROM category AS ca JOIN category_book AS cb ON ca.id = cb.id_category GROUP BY ca.id;'
        const _category_book = 'SELECT * FROM category;'
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
    detail (name_field, file_render) {
        const _category = 'SELECT ca.id, ca.name AS category ,array_agg(cb.name) AS category_book FROM category AS ca JOIN category_book AS cb ON ca.id = cb.id_category GROUP BY ca.id;'
        const _category_book = 'SELECT * FROM category;'
        const _detail = 'SELECT book.*,ca.name AS name_category, cb.name AS name_category_book ' +
                          'FROM book_store AS book JOIN category_book AS cb ON cb.id = book.id_category_book JOIN category AS ca ON ca.id = cb.id_category;'
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

const result = new GetData (db)

module.exports.result = result