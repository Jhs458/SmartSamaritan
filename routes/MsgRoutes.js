var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Messages = mongoose.model('Messages');


var passport = require('passport');


  router.post('/send/', function(req, res, next) { //auth,
     var messages = new Messages(req.body);
    //  message.createdBy = req.payload._id;
     messages.created = new Date();
     messages.save(function(err, result) {
       res.send(result);
     });
   });

  router.get('/', function(req, res, next) {
     Messages.find({}, function(err, result) {
       res.send(result);
     });
   });

module.exports = router;
