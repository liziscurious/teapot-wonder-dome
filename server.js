const express         = require('express');
const mongoose        = require('mongoose');
const morgan          = require('morgan');
const app             = express();
const methodOverride  = require('method-override');
require('pretty-error').start();
const PORT            = process.env.PORT || 3000;


// connect to database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teapot-wonder-dome';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise  = global.Promise;

// test db connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// controllers
const teapotsController   = require('./controllers/teapots.js');
const commentsController  = require('./controllers/comments.js');

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/teapots', teapotsController);
app.use('/comments', commentsController);

// root route
app.get('/', (req, res) => res.redirect('/teapots'));

// listen up
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Teapot Wonder Dome is now on port: ', PORT);
  console.log('===========================');
});
