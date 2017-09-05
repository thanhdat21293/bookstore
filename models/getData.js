const db = require('./index')
class GetData {
    constructor (db) {
      this.db = db
    }
    home () {
        // return this.getCategory()
        const _home = 'SELECT * FROM bookstore;'
        const _category = `SELECT c.id, c.name,
                                (array(
                                    SELECT json_build_object('name', c_c.name, 'id', c_c.id) 
                                    FROM category AS c_c
                                    WHERE c_c.parent = c.id)
                                ) AS cat_child
                            FROM category as c
                            WHERE parent = 0`
        const _category_book = 'SELECT * FROM category  WHERE parent = 0'
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
    category(id){
        let category_get = 'SELECT * FROM category WHERE parent = $1'
        //let category_detail = "SELECT * FROM category,bookstore WHERE category.id = bookstore.id_category AND category.id IN (${ids})"
        let cat_id = 'SELECT * FROM category,bookstore WHERE category.id = bookstore.id_category AND category.id = $1';

        const _category = `SELECT c.id, c.name,
            (array(
                SELECT json_build_object('name', c_c.name, 'id', c_c.id) 
                FROM category AS c_c
                WHERE c_c.parent = c.id)
            ) AS cat_child
        FROM category as c
        WHERE parent = 0`
        const _category_book = 'SELECT * FROM category  WHERE parent = 0'

        return db.task(t => {
            return t.any(category_get, id)
                .then(cat => {
                    if(cat.length > 0) {
                        console.log(1)
                        let arr_id_cat = '';
                        let count = 0;
                        cat.map(cate => {
                            count++;
                            if(count === 1){
                                arr_id_cat += cate.id;
                            }else{
                                arr_id_cat += ',' + cate.id;
                            }
                        })
                        return db.task('data', function * (t) {
                            const home = yield t.any(`SELECT * FROM category,bookstore WHERE category.id = bookstore.id_category AND category.id IN (${arr_id_cat})`)
                            const category = yield t.any(_category)
                            const category_book = yield t.any(_category_book)
                            return {
                                home: home,
                                category: category,
                                category_book: category_book
                            }
                        }) 
                    }else{
                        return db.task('data', function * (t) {
                            const home = yield t.any(cat_id,id)
                            const category = yield t.any(_category)
                            const category_book = yield t.any(_category_book)
                            return {
                                home: home,
                                category: category,
                                category_book: category_book
                            }
                        })    
                    }
                    
                });
        })
    }
    // detail (name_field, file_render) {
    //     const _category = 'SELECT ca.id, ca.name AS category ,array_agg(cb.name) AS category_book FROM category AS ca JOIN category_book AS cb ON ca.id = cb.id_category GROUP BY ca.id;'
    //     const _category_book = 'SELECT * FROM category;'
    //     const _detail = 'SELECT book.*,ca.name AS name_category, cb.name AS name_category_book ' +
    //                       'FROM bookstore AS book JOIN category_book AS cb ON cb.id = book.id_category_book JOIN category AS ca ON ca.id = cb.id_category;'
    //     return db.task('data', function * (t) {
    //         const detail =  yield t.any(_detail)
    //         const category = yield t.any(_category)
    //         const category_book = yield t.any(_category_book)
    //         return {
    //             detail: detail,
    //             category: category,
    //             category_book: category_book
    //         }
    //     })      
    // }



}

//const result = new GetData (db)
module.exports = new GetData(db)
//module.exports.result = result