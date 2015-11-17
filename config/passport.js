var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var configAuth = require('./auth');



// used to serialize the user for the session
   passport.serializeUser(function(user, done) {
       done(null, user.id);
   });

   // used to deserialize the user
   passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
           done(err, user);
       });
   });



passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if(err) {return done(err);}
    if(!user) {return done("Could not find user in the database.");}
    if(!user.checkPassword(password)) {return done("Incorrect password.");}
    return done(null, user);
  });
}));
