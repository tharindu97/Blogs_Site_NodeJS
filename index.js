const path = require('path')

const expressEdge = require('express-edge')

const express = require('express')

const edge = require('edge.js')

const app = new express();

app.use(express.static('public'))

app.use(expressEdge)
app.set('views', `${__dirname}/views`)
/*app.use('*', (req,res,next)=>{
    edge.global('authMiddleware', req.session.userId);
    next();
})*/

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})


app.listen(4000, () => {
    console.log('App Listening on port 4000')
})