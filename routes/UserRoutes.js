var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Jobs = mongoose.model('Jobs');
var Applicants = mongoose.model('Applicants');
var passport = require('passport');
var jwt = require('express-jwt');

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if(err) return next(err);
    res.send(user.createToken());
  })(req, res, next);
});

router.get('/dashboard/:id', function(req, res, next){
  var sendBack ={};

  Jobs.find({createdBy:req.params.id}).where('isCompleted').equals(false)
  .exec(function(err, result){
    if(err) return next(err);
    if(!result) return next('Could not find request');
    sendBack.posting = result;

  Jobs.find()
  .where('applicants.applicant').equals(req.params.id).where('isCompleted').equals(false)
  .exec(function(err, result){
    if(err) return next(err);
    if(!result) return next('Could not find request');
    sendBack.applying = result;
    res.send(sendBack);
  });
});
});

router.put('/jobExp/:id', function(req, res, next) {//auth
  User.update({_id: req.params.id}, {$inc: {experience: 2}},
    function(err, result) {
    if(err) return next(err);
    res.send();
  });
});

console.log("userroutes57");

router.put('/jobCurrency', function(req,res,next){
  console.log(req.body.posterID, "posterid58");
  console.log(req.body.appID, "posterid58");
  console.log(req.body.currency, "posterid58");
  User.update({_id: req.body.posterID},{$inc:{currency: - req.body.currency}},
  function(err, result) {
    if(err) return next(err);
  User.update({_id: req.body.appID},{$inc:{currency: req.body.currency}},
  function(err, result) {
    if(err) return next(err);
    res.send();
    });
  });
});

//sending info on the new profile pic to server
router.put('/:id',function(req,res,next){
  console.log(req.body,"line64");
  console.log(req.params,"line65");

  User.update({_id: req.params.id},{
    photo: req.body.url,
  },
  function(err,result){
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  res.send(result);
});
});


// =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  router.get('/auth/facebook',
  passport.authenticate('facebook', { scope:
  ["email", "public_profile"]}));

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: "/splash" }), function(req, res) {
  	if(req.user) {
  		var token = { token : req.user.createToken() } ;
  		res.redirect('/#/auth/token/' + token.token) ;
  	} else {
  		res.send("you are not authenticated") ;
  	}
  })

// =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: "/splash" }), function(req, res) {
  	if(req.user) {
  		var token = { token : req.user.generateJWT() } ;
  		res.redirect('/#/auth/token' + token.token) ;
  	} else {
  		res.send("you are not authenticated") ;
  	}
  })

  // route for logging out
  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

router.get('/userinfo/:id', function(req, res, next){
      User.findOne({_id: req.params.id}, function(err, result){
        if(err) {return next(err);}
        if(!result) {return next({err: "Error finding user by ID."});}
        res.send(result);
      });
    });


router.put('/infoedit/:id',function(req,res,next){
  console.log(req.body,"edit body");
  console.log(req.params,"edit params");
  User.update({_id: req.params.id},
    {$set: {
      username: req.body.username,
      email: req.body.email,
      location: {street: req.body.location.street, city: req.body.location.city, state: req.body.location.state, zip: req.body.location.zip}
    }},
  function(err,result){
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  res.send(result);
});
});


module.exports = router;
