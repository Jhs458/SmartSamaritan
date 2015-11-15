var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Jobs = mongoose.model('Jobs');
var Applicants = mongoose.model('Applicants');
var passport = require('passport');
var jwt = require('express-jwt');

router.post('/register', function(req, res, next) {
  var user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(function(err, result) {
    if(err) return next(err);
    if(!result) return next('There was an issue registering that user.');
    res.send(result.createToken());
  });
});

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






module.exports = router;
