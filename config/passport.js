var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook');
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


// =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({

      // pull in our app id and secret from our auth.js file
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ['emails', 'name', 'photos'],

  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {
      console.log(profile);
      // asynchronous
      process.nextTick(function() {
          //find the user in the database based on their facebook id
          User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

              // if there is an error, stop everything and return that
              // ie an error connecting to the database
              if (err)
                  return done(err);

              // if the user is found, then log them in
              if (user) {
                  return done(null, user); // user found, return that user
              } else {
                  // if there is no user found with that facebook id, create them
                  var newUser = new User();

                  // set all of the facebook information in our user model
                  newUser.facebook.id = profile.id; // set the users facebook id
                  newUser.facebook.token = token; // we will save the token that facebook provides to the user
                  newUser.username  = profile.name.givenName + profile.name.familyName; // look at the passport user profile to see how names are returned
                  newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                  newUser.experience = 0;
                  newUser.facebook.photo = profile.photos[0].value;

                  // save our user to the database
                  newUser.save(function(err) {
                      if (err)
                          throw err;

                      // if successful, return the new user
                      return done(null, newUser);
                  });
              }

          });
      });

  }));
