// <<<<<<<This is the controller>>>>>>>>>
const express     = require('express');
const router      = express.Router();

// models
const Teapot      = require('../models/teapots.js');
const Comment     = require('../models/comments.js');

// index route (GET)
router.get('/', async (req, res) => {
  try{
    const allTeapots = await Teapot.find();
    if (req.session.logged) {
      res.render('./teapots/index.ejs', {
        allTeapots,
        username: req.session.username
      });
      // res.send({allTeapots});
      // res.send("Welcome to the Teapot Wonder Dome Index")
    } else {
      res.redirect('/user/login');
    }
  } catch (err) {
    res.send(err.message);
  }
});

// new  (GET)
router.get('/new', (req, res) => {
  try {
    // res.send("This is the route to add a NEW teapot");
    res.render('./teapots/new.ejs');
  } catch (err) {
    res.send(err.message);
  }
});

// create (POST)
router.post('/', async (req, res) => {
  try {
    const newTeapot = await Teapot.create(req.body);
    res.redirect('/teapots/'+newTeapot.id);
    // res.redirect('/teapots/');
  } catch (err) {
    res.send(err.message);
  }
});

// show (GET)
router.get('/:id', async (req, res) => {
  try {
    const oneTeapot = await Teapot.findById(req.params.id);
    const comments  = await Comment.find( {teapot: oneTeapot._id});
    // res.send({oneTeapot});
    res.render('./teapots/show.ejs', {oneTeapot, comments});
  } catch (err) {
    res.send(err.message);
  }
});

// edit (GET)
router.get('/:id/edit', async (req, res) => {
  try {
    const editThisTeapot = await Teapot.findById(req.params.id);
    res.render('./teapots/edit.ejs', {editThisTeapot});
    // res.send({editThisTeapot});
  } catch (err) {
    res.send(err.message);
  }
});

// update (PUT)     --------->> teapots only <<--------------
router.put('/:id', async (req, res) => {
  try {
    const updatedTeapot = await Teapot.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});

// delete (DELETE) ----->> only deletes teapots now <<--------
router.delete('/:id', async (req, res) => {
  try {
    const teapot = await Teapot.findByIdAndRemove(req.params.id);
    await Comment.remove({ teapot: teapot._id});
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});

module.exports  = router;
