const express         = require('express');
const mongoose        = require('mongoose');
const morgan          = require('morgan');
const app             = express();
const methodOverride  = require('method-override');
require('pretty-error').start();
const PORT            = process.env.PORT || 3000;
const bcrypt          = require('bcrypt');
const session         = require('express-session');


// connect to database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teapot-wonder-dome';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise  = global.Promise;

// test db connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
  secret: 'mdcoiegrkj', //random string
  resave: false,
  saveUninitialized: false,
}));

// controllers
const teapotsController   = require('./controllers/teapots.js');
const commentsController  = require('./controllers/comments.js');
const sessionsController  = require('./controllers/sessions.js');

// more middleware
app.use('/teapots', teapotsController);
app.use('/comments', commentsController);
app.use('/user', sessionsController);

// root route
app.get('/', (req, res) => res.redirect('/teapots'));

// listen up
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Teapot Wonder Dome is now on port: ', PORT);
  console.log('===========================');
});
