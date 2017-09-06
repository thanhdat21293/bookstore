module.exports.detail_book = function (router) {
    const detail = require('../models/getData').detail

    /**
     *  router book display all books
     */
    router.get('/book/:book', (req, res) => {
        const name_item = req.params.book
        let name_field = 'name_book'
        const file_render = 'detail_book'
        detail(name_field, file_render)
            .then(data => {
                /**
                 *  Using loop to check, if items exist, it'll push into an array to send to client.
                 *  Return an Array[].
                 */
                let result = []
                for(let item in data.detail) {
                    // Convert name item to compare param item on url
                    const itemConverted = data.detail[item][name_field].replace(/ /g, '-').toLowerCase().replace(/,/g,'').replace('#','-sharp')
                    if(name_item === itemConverted) {                            
                        result.push(data.detail[item])
                    }
                }
                res.render(file_render, {
                    detail: result,
                    data: data
                })    
            })       
    })

    /**
     *  router author to find a author
     */
    router.get('/author/:author', (req, res) => {
        const name_item = req.params.author
        let name_field = 'author'
        const file_render = 'book'
        detail(name_field, file_render)
            .then(data => {
                /**
                 *  Using loop to check, if items exist, it'll push into an array to send to client.
                 *  Return an Array[].
                 */
                let result = []
                for(let item in data.detail) {
                    // Convert name item to compare param item on url
                    let itemConverted = data.detail[item][name_field].replace(/ /g, '-').toLowerCase()                                          
                    if(name_item === itemConverted) { 
                        result.push(data.detail[item])
                    }
                }  
                res.render(file_render, {
                    detail: result,
                    data: data
                })
            })       
    })

    /**
     *  router author to find a category
     */
    router.get('/category/:category', (req, res) => {
        const name_item = req.params.category
        let name_field = 'category'
        const file_render = 'book'
        detail(name_field, file_render)
            .then(data => {
                /**
                 *  Using loop to check, if items appear exist, it'll push into an array to send to client.
                 *  Return an Array[].
                 */
                let result = []
                for(let item in data.detail) {
                    // Convert name item to compare param item on url
                    let itemConverted = data.detail[item][name_field].replace(/ /g, '-').toLowerCase()                      
                    if(name_item === itemConverted) {
                        result.push(data.detail[item])
                    }
                }  
                res.render(file_render, {
                    detail: result,
                    data: data
                })
            }) 
    })
}