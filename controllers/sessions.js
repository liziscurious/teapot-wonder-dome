const express         = require('express');
const bcrypt          = require('bcrypt');
const router          = express.Router();
const User            = require('../models/users.js');


// route to login.ejs
router.get('/login', (req, res) => {
  // console.log(req.session);
  try {
    res.render('sessions/login.ejs', {username: req.session.username});
  } catch (err) {
    res.send(err.message);
  }
});

// login post
router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({username: req.body.username});
    console.log("foundUser", foundUser);
    if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.username = req.body.username;
      req.session.logged = true;
      console.log(req.session, req.body);
      res.redirect('/');
    } else {
      console.log('else in bcrypt compare');
      // req.session.message = 'Username or password are incorrect';
      res.redirect('/user/login');
    }
  } catch (err) {
    res.send(err.message);
    // res.redirect('/login');
  }
});

// register show route
router.get('/register', (req, res) => {
  res.render('photos/register.ejs')
});

// update route for testing purposes
router.get('/update', (req, res) => {
	req.session.anyProperty = 'something';
  console.log(req.session);
});

// register post route
router.post('/register', async (req, res) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const username = req.body.username;

  const userDbEntry = {};

  userDbEntry.username = username;
  userDbEntry.password = passwordHash;

  try {
    const user = await User.create(userDbEntry);
    req.session.username = user.username;
    req.session.logged = true;
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
