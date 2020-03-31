const expressEdge = require('express-edge')

const express = require('express')

const mongoose = require('mongoose')

const bodyPaser = require('body-parser')

const fileUpload = require('express-fileupload');

const edge = require('edge.js')


const createPostController = require('./controllers/createPost');
const homePostController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const app = new express();

mongoose.connect('mongodb://localhost/node-js-blog',
 {   
    useUnifiedTopology: true,
    useNewUrlParser: true
 }
)

app.use(fileUpload());
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true}))

const validateCreatePostMiddleware = (req, res, next) =>{
    if(!req.files.image || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content){
        return res.redirect('/posts/new');
    }
    next()
}
app.use('/posts/store',validateCreatePostMiddleware);


app.get('/posts/new', createPostController);
app.get('/', homePostController);
app.post('/posts/store', storePostController);
app.get('/post/:id', getPostController);


app.listen(4000, () => {
    console.log('App Listening on port 4000')
})