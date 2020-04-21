const expressEdge = require('express-edge')

const express = require('express')

const mongoose = require('mongoose')

const bodyPaser = require('body-parser')

const fileUpload = require('express-fileupload');

const edge = require('edge.js')
try {
    mongoose.connect('mongodb://localhost/node',
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true      
        }
    )
    console.log('mongoDb Connected');
} catch (error) {
    console.log('MongoDB error when connecting: ${error}');
}

const createPostController = require('./controllers/createPost');
const homePostController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserControler = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const app = new express();


app.use(fileUpload());
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true}))

const storePost = require('./middleware/storePost'); 
app.use('/posts/store',storePost);


//controllers
app.get('/', homePostController);
app.get('/post/:id', getPostController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePostController);
app.get('/auth/register',createUserControler);
app.get('/auth/login', loginController);
app.post('/users/login',loginUserController);
app.post('/users/register',storeUserController);



app.listen(4000, () => {
    console.log('App Listening on port 4000')
})