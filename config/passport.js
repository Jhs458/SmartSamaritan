var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if(err) {return done(err);}
    if(!user) {return done("Could not find user in the database.");}
    if(!user.checkPassword(password)) {return done("Incorrect password.");}
    return done(null, user);
  });
}));
