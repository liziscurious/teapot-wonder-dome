// <<<<<<<This is the controller>>>>>>>>>

const express     = require('express');
const router      = express.Router();

// models
const Comment    = require('../models/comments.js');


// routes

// index
router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.find().populate('teapot');
    res.send({allComments});
  } catch (err) {
    res.send(err.message);
  }
});

// create
router.post('/', async (req, res) => {
  try {
    const createdComment = await Comment.create( req.body );
    res.redirect('back');
  } catch (err) {
    res.send(err.message);
  }
});

// delete route
router.delete('/:id', async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);
  res.redirect('back');
});

module.exports  = router;
