// routes/user.js

var express = require('express');
//var passport = require('passport');
//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

// Get the user profile (express route)
router.get('/register', function(req, res, next) {
  console.log('routes / user JS')
  res.render('register');
});

// // Get the user profile
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

module.exports = router;