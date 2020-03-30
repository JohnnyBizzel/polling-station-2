// require('@risingstack/trace');

// your application's code
var express = require('express');
var expressValidator = require('express-validator'); // new
var exphbs = require('express-handlebars'); // new

var path = require('path');
var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var dotenv = require('dotenv');
var passport = require('passport');


// your application's code
var bodyParser = require('body-parser');
var mongoose =require("mongoose");


dotenv.load();

const userpass = process.env.MONGO_USER + ':' + process.env.MONGO_PWD;

var dbUrl = 'mongodb://' +userpass+ '@ds053718.mlab.com:53718/fcc-polls';

mongoose.connect(dbUrl, { useMongoClient: true}, function(err, res){
  if (err){
    console.log("Db connection failed: " + err);
  } else {
    console.log("Db Connected"
    );
  }
  
});


var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/favicon.png')));

// view engine setup
// VIEW ENGINE CHANGED:::
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Vlad code: load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


// In this example, the formParam value is going to get morphed into form body format useful for printing. 
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(express.static(path.join(__dirname, 'public')));
// routes
const index = require('./routes/index');
const api = require('./routes/api');
const user = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/', index);
app.use('/api', api);
app.use('/user', user);
app.use('/auth', authRoutes);

// REACT routes
// TODO are these overriding the routes in the routes/index file?
// app.use('/Polldetailfull/:id', index);
// app.use('/editthepoll/:id', index);
// app.use('/createPoll', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found - You followed an invalid URL');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;