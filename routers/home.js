module.exports.home = function (router) {
    const home = require('../models/getData').home
    /**
     *  router home to display page = 1
     */
    router.get('/', (req, res) => {
        home(req)
            .then(data => {
                // res.json(data)
                res.render('index',{
                    data: data
                })
            })
    })
    /**
     *  router home to display page > 1
     */
    router.get('/page/:page', (req, res) => {
        home(req)
            .then(data => {
                // res.json(data)
                res.render('index',{
                    data: data
                })
            })
    })
}