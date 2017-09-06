module.exports.home = function (router) {
    const home = require('../models/getData').home()
    router.get('/', (req, res) => {
        home
            .then(data => {
                res.render('index',{
                    data: data
                })
            })
    })
}