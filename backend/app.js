require('dotenv').config();

var path = require('path');
var express = require('express');
var cors = require('cors');


var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var index = require('./routes/index');
var users = require('./routes/users');
var colors_analyze = require('./routes/colors_analyze');
var colors_search = require('./routes/colors_search');
var colors_further = require('./routes/colors_further');

var app = express();

//colors_analyze_conn=mongodb://pweyand:Fvnjty0b@ds147480.mlab.com:47480/colors_analyze
//colors_further_conn=mongodb://pweyand:Fvnjty0b@ds147520.mlab.com:47520/colors_further
//colors_search_conn=mongodb://pweyand:Fvnjty0b@ds147510.mlab.com:47510/colors_search


var analyze_conn = mongoose.createConnection(process.env.colors_analyze_conn);
var further_conn = mongoose.createConnection(process.env.colors_further_conn);
var search_conn  = mongoose.createConnection(process.env.colors_search_conn);


//mongoose.connect does not work with multiple databases!
//mongoose.connect(process.env.lab_conn_string);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//Because we want all the models to be available at index we do not route through multiple pages
app.use('/', index);
//app.use('/users', users);
//app.use('/analyze', colors_analyze);
//app.use('/search', colors_search);
//app.use('/further', colors_further);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
