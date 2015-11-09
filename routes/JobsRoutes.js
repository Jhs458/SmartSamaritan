var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Jobs = mongoose.model('Jobs');
var Applicants = mongoose.model('Applicants');
var jwt = require('express-jwt');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "SuperSmart" //matches the secret in model
   });



router.get('/:id',function(req,res,next){
  Jobs.findOne({_id: req.params.id}).populate('applicants').exec( function(err, result){
    if(err) {return next(err);}
    if(!result) {return next({err: "Error finding job by ID."});}
    res.send(result);
  });
});

router.get('/',function(req,res,next){
  Jobs.find({},function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.get('/search/:categeory',function(req,res,next){
  console.log(req.params.categeory);
  Jobs.find({categeory:req.params.categeory},function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.post('/', auth, function(req, res, next){
  console.log(req.body, 1);
  console.log(req.payload._id, 2);
  // console.log(req.pauload.id, 3);
  var jobPost = new Jobs(req.body);
  jobPost.createdBy = req.payload._id;
  jobPost.date = new Date();
  jobPost.save(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.delete('/:id', function(req, res, next) {//auth
    Jobs.remove({_id: req.params.id}, function(err, result) {
        if(err) return next(err);
        res.send();
          });
        });

router.put('/:id', function (req, res, next) {//auth
      Jobs.update({_id: req.params.id}, req.body, function (err, result) {
        if(err) return next(err);
        if(!result) return next({err: "The post wasn't found for updating"});
        res.send(result);
      });
    });

// router.post('/apply/:id', function(req, res, next) { //auth,
//   console.log("here");
//   console.log(req.body);
//   Jobs.findOne({_id:req.params.id},function(err,result){
//     result.applicants = req.body;
//     console.log(result);
//       res.send(result.applicants);
//   });

  // var jobPost = Jobs.applicants = req.body;
  // jobPost.save(function(err,result){
  //   if(err) return next(err);
  //   res.send(result);
  // });
  // Jobs.findOne({_id:req.params.id},function(err,result){
  //   applicants.push(req.body)
  //   if(err) return next(err);
  //   if(!result) return next("Could not find that job!");
  //   res.send(result);
  // });
//});

module.exports = router;
