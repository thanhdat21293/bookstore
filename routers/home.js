module.exports.home = function (app) {
    const home = require('../models/getData').result.home
    // const category = require('../models/getData').result.getCategory()

    app.get('/', (req, res) => {
        const file_render = 'index'
        // res.json(home)
        home(file_render)
            .then(data => {
                // res.json(data)
                res.render('index', {
                    data: data
                })
            })
    })
}