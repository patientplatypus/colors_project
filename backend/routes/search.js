
var express = require('express');
var router = express.Router();

var searchconn = require('../db/search_db'), 
  searchmodel = searchconn.model('searchSchema');


/*this should delete all entries in the search and clear the db*/

router.delete('/',function(req,res,next){
  searchmodel.findByIdAndRemove({},function(err,post){
    if (err) console.log(err);

    res.json({
      status: "deleted!",
      post: post  
    });
  });
});

/*this is to post the search url strings to the database*/

router.post('/',function(req,res,next){
  var newSearch = new searchmodel({
    name: req.body.name
    /*title: req.body.title,
    body: req.body.body*/
  });

  newSearch.save(function(err, post){
    if(err){
      res.status(500).send({
        status: "Error", 
        error: err
      });
    }else{
      res.status(200).json({
        status: "ok",
        post: post
      //res.redirect('/');
      });
    }
  });
});



/* this is to get the db of search urls after we have posted them to the db*/

router.get('/', function(req, res, next) {

  searchmodel.find({},function(err,posts){
    if(err) console.log(err);

  //  returnobj.push(posts);
   res.json(posts);

  });

});


module.exports = router;