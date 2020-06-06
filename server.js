// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const session = require('express-session');
let bodyParser = require('body-parser')


//Configuration
require('dotenv').config()
const app = express();
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

// Database
mongoose.connect(
    'mongodb://localhost:27017/inventory',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex: true,
    },
    () => {
        console.log('connected to mongoose');
    }
);

db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

const itemController = require('./controllers/routes.js')
app.use('/items', itemController)

const userController = require('./controllers/users.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

// Routes
app.get('/', (req, res) => {
  res.render('items/welcome.ejs')
})

app.listen(3000, () => {
    console.log('listening');
})
