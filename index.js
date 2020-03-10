const path = require('path')

const expressEdge = require('express-edge')

const express = require('express')

const mongoose = require('mongoose')

const bodyPaser = require('body-parser')

const edge = require('edge.js')

const Post = require('./database/models/Post')

const app = new express();

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(express.static('public'))

app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true}))

/*app.use('*', (req,res,next)=>{
    edge.global('authMiddleware', req.session.userId);
    next();
})*/

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/posts/new', (req,res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) =>{
    Post.create(req.body, (error, post) =>{
        res.redirect('/')
    })
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})


app.listen(4000, () => {
    console.log('App Listening on port 4000')
})