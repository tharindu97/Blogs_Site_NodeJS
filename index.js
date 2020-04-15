const expressEdge = require('express-edge')

const express = require('express')

const mongoose = require('mongoose')

const bodyPaser = require('body-parser')

const fileUpload = require('express-fileupload');

const edge = require('edge.js')

mongoose.connect('mongodb+srv://Tharindu12:Tharindu12@cluster0-ldw7t.azure.mongodb.net/test?retryWrites=true&w=majority',
 {   
    useUnifiedTopology: true,
    useNewUrlParser: true
 }
)

const createPostController = require('./controllers/createPost');
const homePostController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserControler = require('./controllers/createUser');
const app = new express();

app.use(fileUpload());
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true}))

const storePost = require('./middleware/storePost'); 
app.use('/posts/store',storePost);



app.get('/', homePostController);
app.get('/post/:id', getPostController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePostController);
app.get('/auth/register',createUserControler);


app.listen(4000, () => {
    console.log('App Listening on port 4000')
})