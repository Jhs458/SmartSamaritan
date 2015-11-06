var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Jobs = mongoose.model('Jobs');
var jwt = require('express-jwt');
var passport = require('passport');



router.get('/:id',function(req,res,next){
  Jobs.findOne({_id:req.params.id},function(err,result){
    if(err) return next(err);
    if(!result) return next("Could not find that job!");
    res.send(result);
  });
});

router.get('/',function(req,res,next){
  Jobs.find({},function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.post('/',function(req,res,next){
  console.log(req.body);
  var jobPost = new Jobs(req.body);
  jobPost.save(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

module.exports = router;
