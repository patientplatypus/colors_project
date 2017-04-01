require('dotenv').config();

var mongoose = require('mongoose'),
  analyze_conn;

/*

colors_analyze_conn=mongodb://pweyand:Fvnjty0b@ds147480.mlab.com:47480/colors_analyze
colors_further_conn=mongodb://pweyand:Fvnjty0b@ds147520.mlab.com:47520/colors_further
colors_search_conn=mongodb://pweyand:Fvnjty0b@ds147510.mlab.com:47510/colors_search

*/






analyze_conn = mongoose.createConnection('mongodb://pweyand:Fvnjty0b@ds147480.mlab.com:47480/colors_analyze');

analyze_conn.on('error', function(err){
  if(err){
  	throw err;
  	console.log(analyze_conn);
  } 
});

analyze_conn.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = analyze_conn;