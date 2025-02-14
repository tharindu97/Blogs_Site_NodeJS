const expressEdge = require('express-edge')

const express = require('express')

const mongoose = require('mongoose')

const bodyPaser = require('body-parser')

const fileUpload = require('express-fileupload');

const expressSession =require('express-session');

const connectMongo = require('connect-mongo');

const connectFlash = require('connect-flash');

const edge = require('edge.js')
try {
    mongoose.connect('mongodb+srv://Tharindu97:Tharindu97@devconnector-t9kxm.mongodb.net/test?authSource=admin&replicaSet=DevConnector-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
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
const logoutController = require('./controllers/controllerLogout');
const app = new express();

const mongoStore = connectMongo(expressSession);
app.use(connectFlash());

app.use(expressSession({
    secret: 'secet',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));


app.use(fileUpload());
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use('*', (req,res,next) => {
    edge.global('auth', req.session.userId)
    next()
})

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true}))

const storePost = require('./middleware/storePost'); 
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
app.use('/posts/store',storePost);
app.use('/posts/new', auth);


//controllers
app.get('/', homePostController);
app.get('/post/:id', getPostController);
app.get('/posts/new',auth, createPostController);
app.get('/auth/logout', auth, logoutController);
app.post('/posts/store', auth, storePost, storePostController);
app.get('/auth/register', redirectIfAuthenticated, createUserControler);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login',redirectIfAuthenticated, loginUserController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);

app.use((req,res) => res.render('not_found'));

app.listen(4000, () => {
    console.log('App Listening on port 4000')
})