var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Messages = mongoose.model('Messages');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "SuperSmart" //matches the secret in model
});



  router.post('/send/', auth, function(req, res, next) { //auth,
     var messages = new Messages(req.body);
     messages.createdBy = req.payload._id;
     messages.created = new Date();
     messages.save(function(err, result) {
       res.send(result);
     });
   });

  // router.get('/', auth, function(req, res, next) {
  //    Messages.find({_id: req.payload._id}, function(err, result) {
  //      res.send(result);
  //    });
  //  });

   router.get('/', auth, function(req, res, next){
     var sendBack ={};
     console.log(req.payload._id, 'get messages');

     Messages.find({createdBy:req.payload._id})
     .exec(function(err, result){
       if(err) return next(err);
       if(!result) return next('Could not find request');
       sendBack.createdBy = result;
console.log(sendBack.createdBy, 'createdBy');

    Messages.find({sentTo:req.payload._id})
    .exec(function(err, result){
      if(err) return next(err);
      if(!result) return next('Could not find request');
      sendBack.sentTo = result;
console.log(sendBack.sentTo, 'sentTo');

       res.send(sendBack);
     });
   });
   });

module.exports = router;
