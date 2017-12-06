// <<<<<<<This is the controller>>>>>>>>>
const express     = require('express');
const router      = express.Router();

// models
const Teapot      = require('../models/teapots.js');
const Comment     = require('../models/comments.js');
const User            = require('../models/users.js');

// index route (GET)
router.get('/', async (req, res) => {
  try{
    const allTeapots = await Teapot.find();
      res.render('./teapots/index.ejs', {
        allTeapots,
        username: req.session.username
      });
  } catch (err) {
    res.send(err.message);
  }
});

// new  (GET)
router.get('/new', async (req, res) => {
  if (req.session.logged){
    try {
      const currentUser = await User.find({username: req.session.username});
      console.log({currentUser});
      res.render('./teapots/new.ejs', {currentUser});
    } catch (err) {
      res.send(err.message);
    }
  } else {
    try {
      res.redirect('/user/login');
    } catch (err) {
      res.send(err.message);
    }
  }
});

// create (POST)
router.post('/', async (req, res) => {
  if (req.session.logged) {
    try {
      console.log(req.body);
      const newTeapot = await Teapot.create(req.body);
      console.log(newTeapot);
      res.redirect('/teapots/'+newTeapot.id);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    try {
      res.redirect('/user/login');
    } catch (err) {
      res.send(err.message);
    }
  }
});

// show (GET)
router.get('/:id', async (req, res) => {
  try {
    const oneTeapot = await Teapot.findById(req.params.id);
    console.log(oneTeapot.user);
    const comments  = await Comment.find( {teapot: oneTeapot._id});
    const userAuthor = await User.findById(oneTeapot.user);
    res.render('./teapots/show.ejs', {
      oneTeapot, comments, username: req.session.username, userAuthor});
  } catch (err) {
    res.send(err.message);
  }
});

// edit (GET)
router.get('/:id/edit', async (req, res) => {
  if (req.session.logged) {
    try {
      const editThisTeapot = await Teapot.findById(req.params.id);
        res.render('./teapots/edit.ejs', {
          editThisTeapot, username: req.session.username
        });
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.redirect('/user/login');
  }
});

// update (PUT)     --------->> teapots only <<--------------
router.put('/:id', async (req, res) => {
  if (req.session.logged){
    try {
      const updatedTeapot = await Teapot.findByIdAndUpdate(req.params.id, req.body);
      res.redirect('/');
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.redirect('/user/login');
  }
});

// delete (DELETE) ----->> deletes teapots and associated comments <<------
router.delete('/:id', async (req, res) => {
  if (req.session.logged) {
    try {
      const teapot = await Teapot.findByIdAndRemove(req.params.id);
      await Comment.remove({ teapot: teapot._id});
      res.redirect('/');
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.redirect('/user/login');
  }
});

module.exports  = router;
