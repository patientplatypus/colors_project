
//way we were doing it in class 
/*

var express = require('express');
var router = express.Router();

/* GET home page. */
/*

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


*/


//http://blog.blairvanderhoof.com/post/37309147906/why-arent-my-models-returning-from-their-queries

/*
var db = require('db'), //retrieves the connection made with createConnection
  MyModel = db.model('MyModel'); //you must use db.Model('MyModel') not mongoose.Model('MyModel') if you use createConnection

MyModel.findOne({}, function(){
  //do stuff here
});
*/

//model schema pulling from
/*

var mongoose = require('mongoose');

var analyzeSchema = new mongoose.Schema({
	prop: String
});

mongoose.model('analyzeSchema', analyzeSchema);

*/
//connections in app.js
/*

var analyze_conn = mongoose.createConnection(process.env.colors_analyze_conn);
var further_conn = mongoose.createConnection(process.env.colors_further_conn);
var search_conn  = mongoose.createConnection(process.env.colors_search_conn);

*/


//var express = require('express');

var express = require('express');
var router = express.Router();

var analyzeconn = require('../db/analyze_db'), 
  analyzemodel = analyzeconn.model('analyzeSchema');

var furtherconn = require('../db/further_db'), 
  furthermodel = furtherconn.model('furtherSchema');

var searchconn = require('../db/search_db'), 
  searchmodel = searchconn.model('searchSchema');

var returnobj = [];



/* GET home page. */
router.get('/', function(req, res, next) {

  analyzemodel.find({},function(err,posts){
    if(err) console.log(err);

   returnobj.push(posts);
  // res.json(posts);

  });

  searchmodel.find({},function(err,posts){
    if(err) console.log(err);

    returnobj.push(posts);
  // res.json(posts);

  });

  furthermodel.find({},function(err,posts){
    if(err) console.log(err);

    returnobj.push(posts);
  // res.json(posts);

  });

  res.json(returnobj);

/**/
});

module.exports = router;