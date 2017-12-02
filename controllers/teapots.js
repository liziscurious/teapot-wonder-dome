// this is the controller
const express     = require('express');
const router      = express.Router();

// models
const Teapot      = require('../models/teapots.js');
// const Comment     = require('../models/comments.js');

// index route
router.get('/', async (req, res) => {
  res.send("Teapot Index")
});

module.exports  = router;
