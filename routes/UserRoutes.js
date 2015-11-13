var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Jobs = mongoose.model('Jobs');
var Applicants = mongoose.model('Applicants');
var passport = require('passport');

// router.post('/register', function(req, res, next) {
//   var user = new User(req.body);
//   user.setPassword(req.body.password);
//   user.save(function(err, result) {
//     if(err) return next(err);
//     if(!result) return next('There was an issue registering that user.');
//     res.send(result.createToken());
//   });
// });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if(err) return next(err);
    res.send(user.createToken());
  })(req, res, next);
});

router.get('/dashboard/:id', function(req, res, next){
  var sendBack ={};
  Jobs.find({createdBy:req.params.id})
  .exec(function(err, result){
    if(err) return next(err);
    if(!result) return next('Could not find request');
    sendBack.posting = result;

  Jobs.find()
  .where('applicants.applicant').equals(req.params.id)
  .exec(function(err, result){
    if(err) return next(err);
    if(!result) return next('Could not find request');
    sendBack.applying = result;
    res.send(sendBack);
    console.log(sendBack);
  });


});

});

module.exports = router;
