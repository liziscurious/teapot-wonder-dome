const express         = require('express');
const bcrypt          = require('bcrypt');
const router          = express.Router();
const User            = require('../models/users.js');


// route to login.ejs
router.get('/login', (req, res) => {
  // console.log(req.session);
  res.render('sessions/login.ejs');
});

// login post
router.post('/login', (req, res) => {
 req.session.username = req.body.username;
 req.session.logged = true;
 console.log(req.session);
 res.redirect('/')
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/update', (req, res) => { //any route will work
	req.session.anyProperty = 'something';
  console.log(req.session);
});


module.exports = router;
