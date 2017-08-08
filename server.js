var express = require('express')

var app = express()

app.use(express.static(__dirname))

app.use('/', (req, res) =>
{
    res.redirect('/index.html')
})

app.listen(9339, () =>
{
    console.log('server started 9339')
})