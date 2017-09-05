module.exports.home = function (app) {
    const home = require('../models/getData');
    // const category = require('../models/getData').result.getCategory()

    app.get('/', (req, res) => {
        // res.json(home)
        home.home()
            .then(data => {
                res.render('index',{
                    data: data
                })
            })
    })
}