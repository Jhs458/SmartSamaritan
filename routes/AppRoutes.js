var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Applicants = mongoose.model('Applicants');
var Jobs = mongoose.model('Jobs');
var User = mongoose.model('User');

router.post('/apply/:id', function(req,res,next){
  var appPost = new Applicants();
  appPost.applicant = req.body._id;
  appPost.username = req.body.username;
  appPost.created = new Date();
  appPost.jobId = req.params.id;
  appPost.save(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.get('/:id',function(req,res,next){
  Applicants.find({jobId:req.params.id},function(err,result){
    if(err) return next(err);
    if(!result) return next("Could not find that job!");
    res.send(result);
  });
});

router.delete('/delete/:id', function(req, res, next) {//auth
  Applicants.remove({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    res.send();
      });
    });

var passport = require('passport');

module.exports = router;
