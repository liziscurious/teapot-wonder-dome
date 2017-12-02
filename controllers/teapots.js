// this is the controller
const express     = require('express');
const router      = express.Router();

// models
const Teapot      = require('../models/teapots.js');
// const Comment     = require('../models/comments.js');

// index route (GET)
router.get('/', async (req, res) => {
  try{
    const allTeapots = await Teapot.find();
    res.send({allTeapots});
    // res.send("Welcome to the Teapot Wonder Dome Index")
  } catch (err) {
    res.send(err.message);
  }
});

// new  (GET)
router.get('/new', (req, res) => {
  try {
    res.send("This is the route to add a NEW teapot");
  } catch (err) {
    res.send(err.message);
  }
});

// create (POST)
router.post('/', async (req, res) => {
  try {
    const newTeapot = await Teapot.create(req.body);
    res.send({newTeapot});
  } catch (err) {
    res.send(err.message);
  }
});

// show (GET)
router.get('/:id', async (req, res) => {
  try {
    const oneTeapot = await Teapot.findById(req.params.id);
    res.send({oneTeapot});
  } catch (err) {
    res.send(err.message);
  }
});

// edit (GET)
router.get('/:id/edit', async (req, res) => {
  try {
    const editThisTeapot = await Teapot.findById(req.params.id);
    res.send({editThisTeapot});
  } catch (err) {
    res.send(err.message);
  }
});

// update (PUT)

// delete (DELETE) ----->> only deletes teapots now <<--------
router.delete('/:id', async (req, res) => {
  try {
    const teapot = await Teapot.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});

module.exports  = router;
