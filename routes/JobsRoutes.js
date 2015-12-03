var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Jobs = mongoose.model('Jobs');
var Applicants = mongoose.model('Applicants');
var jwt = require('express-jwt');
var passport = require('passport');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "SuperSmart" //matches the secret in model
});

router.put('/choose/', auth, function(req,res){  //auth
  User.findOne({_id: req.body.userIdToPush}, function(err, userInfo){
    Jobs.findOne({_id: req.body.stateParamsId},function(err,result){
      result.chosenApp.push(userInfo.username);
      result.save(function(err,result){
        res.send(result);
      });
    });
  });

});
var count = 0;
router.get('/:id', function(req,res,next){
  Jobs.findOne({_id: req.params.id}, function(err, result){
    if(err) {
      return res.status(500).send({err: "error"});
    }
    if(!result) {return next({err: "Error finding job by ID."});}
    res.send(result);
  });
});

router.get('/',function(req,res,next){
  Jobs.find({isCompleted:false},function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.get('/search/:categeory',function(req,res,next){
  Jobs.find({categeory:req.params.categeory},function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.post('/', auth, function(req, res, next){
  var jobPost = new Jobs(req.body);
  jobPost.createdBy = req.payload._id;
  jobPost.createdByUsername = req.payload.username;
  jobPost.createdByImage = req.payload.photo;
  jobPost.date = new Date();
  jobPost.save(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});


router.post('/calendar',auth,function(req,res,next){
  var title = req.body.title;
  var date = req.body.createdDate;
  var currency = req.body.currency;
});

router.delete('/:id', function(req, res, next) {//auth
  Jobs.remove({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    res.send();
  });
});

router.put('/apply', function(req, res, next) {//auth
  Jobs.update({_id: req.body.jobID}, {$pull: {applicants: {_id: req.body.appID}}},
    function(err, result) {
      if(err) return next(err);
      res.send();
    });
  });

  router.put('/accept', auth, function(req, res, next) {//auth
    sendBack = {};
    Jobs.update({_id: req.body.jobId}, {$pullAll: {chosenApp: [req.payload.username]}},
      function(err, result) {
        if(err) return next(err);
        sendBack.one = result;

    Jobs.update({_id: req.body.jobId}, {declinedHandshake: req.payload._id},
      function(err, result) {
        if(err) return next(err);
        sendBack.two = result;
        res.send();
      });
    });
  });

      router.put('/confirm', function(req, res, next) {//auth
        Jobs.update({_id: req.body.jobID}, {isConfirmed:true},
          function(err, result) {
            if(err) return next(err);
            res.send();
          });
        });

        router.put('/complete/:id', function(req, res, next) {//auth
          Jobs.update({_id: req.params.id}, {isCompleted:true},
            function(err, result) {
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

          router.put('/apply/:id', auth, function(req, res, next) { //auth,
            appPost = {};
            appPost.applicant = req.payload._id;
            appPost.username = req.payload.username;
            appPost.created = new Date();


            Jobs.findOne({_id:req.params.id},function(err, result){
              result.applicants.push(appPost);
              result.save(function(err, result) {
                res.send(result);
              });
            });
          });










          module.exports = router;
