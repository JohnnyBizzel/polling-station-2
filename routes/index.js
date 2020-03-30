var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
//var Auth = require('../src/utils/Auth');

// Get the user registration (Node express route)
router.get('/user/register', function(req, res, next) {
  res.render('register');
});


  /* GET home page. */
router.get('/', function(req, res, next) {
    console.log("get route /");
  res.render('index', { title: 'The Polling Station' });
});

  
router.get("/createpolls",function(req,res,next){
  res.render("index",null);
});


// router.get('/Home', function(req, res, next) {
//     console.log("get route /Home");
//   res.render('index', { title: 'The Polling Station - Home' });
// });

router.get('/login', function(req, res, next) {  
  console.log("get route /login");
  res.render('index', { title: 'Log in' });
});

router.get("/Polldetailfull",function(req,res,next){
  console.log("get route /PollDetailFull");
  res.render('index', { title: 'Poll detail ' });
});

router.get("/editthepoll",function(req,res,next){
  console.log("get route /EditthePoll");
  res.render('index', { title: 'Edit Poll' });
});

// New React Register  route
router.get('/register', function(req, res, next) {
  res.render('index');
});

// POST requests
// Register new User
router.post('/user/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;  
});

module.exports = router;
