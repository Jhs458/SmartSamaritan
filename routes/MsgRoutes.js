var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Messages = mongoose.model('Messages');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var passport = require('passport');
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

router.get('/', auth, function(req, res, next){
  var sendBack ={};
  Messages.find({createdBy:req.payload._id})
  .populate('sentTo', 'username')
  .exec(function(err, result){
    if(err) return next(err);
    if(!result) return next('Could not find request');
    sendBack.createdBy = result;
    Messages.find({sentTo:req.payload._id})
    .populate('createdBy', 'username')
    .exec(function(err, result){
      if(err) return next(err);
      if(!result) return next('Could not find request');
      sendBack.sentTo = result;
      res.send(sendBack);
    });
  });
});

module.exports = router;
