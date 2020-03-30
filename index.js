const path = require('path')

const expressEdge = require('express-edge')

const express = require('express')

const mongoose = require('mongoose')

const bodyPaser = require('body-parser')

const fileUpload = require('express-fileupload');

const edge = require('edge.js')

const Post = require('./database/models/Post')

const app = new express();

mongoose.connect('mongodb://localhost/node-js-blog',
 {   
    useUnifiedTopology: true,
    useNewUrlParser: true
 }
)

app.use(fileUpload());

app.use(express.static('public'))

//image picker

app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true}))

const customMiddleware = (req, res, next) =>{
    console.log('I HAVE BEEN CALLED.');
    next()
}
app.use(customMiddleware);

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
    const { image } = req.files
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) =>{
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) =>{
            res.redirect('/');
        }) 
    }); 
})

app.get('/post/:id', async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post',{
        post
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})


app.listen(4000, () => {
    console.log('App Listening on port 4000')
})