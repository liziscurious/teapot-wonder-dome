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

// update (PUT)

// delete (DELETE)

module.exports  = router;
