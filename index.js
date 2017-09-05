const express = require('express')
const app = express()
const port = 3000
const nunjucks = require('nunjucks')
// const bodyParser = require('body-parser')
const home = require('./routers/home').home
const detail_book = require('./routers/detail_book').detail_book

// Using file static for project
app.use(express.static('public'))

// nunjucks config 
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true 
})

app.engine('html', nunjucks.render)
app.set('view engine', 'html')

/**
 *  All routers
 */
home(app)
detail_book(app)

app.listen(port, function () {
    console.log(`Server on running on port ${port}!`)
})