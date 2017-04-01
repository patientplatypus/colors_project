//way we were doing it in class

/*

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, required: true }
});

var roster = mongoose.model('roster', schema);

module.exports = roster;

//http://blog.blairvanderhoof.com/post/37309147906/why-arent-my-models-returning-from-their-queries

*/

/*
var mongoose = require('mongoose');

var MyModelSchema = new mongoose.Schema({
  prop: String
});

mongoose.model('MyModel', MyModelSchema);

*/

var mongoose = require('mongoose');

var analyzeSchema = new mongoose.Schema({
	prop: String
});

mongoose.model('analyzeSchema', analyzeSchema);