module.exports.detail_book = function (app) {
    const detail = require('../models/getData').result.detail
    // Controller
    app.get('/:type/:item', (req, res) => {
        const type = req.params.type
        const name_item = req.params.item
        if(type === 'book') {
            let name_field = 'name'
            const file_render = 'detail_book'
            detail(name_field, file_render)
                .then(data => {
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
        } else if(type === 'author' ) {
            let name_field = 'author'
            const file_render = 'book'
            detail(name_field, file_render)
                .then(data => {
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
        } else if (type === 'category') {
            let name_field = 'name_category'
            const file_render = 'book'
            detail(name_field, file_render)
                .then(data => {
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
        }
    })
}