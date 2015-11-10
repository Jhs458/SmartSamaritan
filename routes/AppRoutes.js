var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Applicants = mongoose.model('Applicants');
var Jobs = mongoose.model('Jobs');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "SuperSmart" //matches the secret in model
   });

router.post('/apply/:id', auth, function(req,res,next){
  var appPost = new Applicants();
  console.log(req.body, 1);
  console.log(req.payload, 2);
  appPost.applicant = req.payload._id;
  appPost.username = req.payload.username;
  appPost.created = new Date();
  appPost.jobId = req.params.id;
  appPost.save(function(err, result){
    if(err) return next(err);

    Jobs.findOne({_id:req.params.id},function(err, result){
    result.applicants.push(req.payload._id);
    result.save(function(err, result) {
      res.send(result.applicants);
    });
    console.log(result, 6);
  });
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
