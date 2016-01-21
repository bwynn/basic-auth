// config/passport.js

// load all packages
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require("../models/user");

module.exports = function(passport) {

// passport session set up
// =============================================================================
// required for persistent login sessions
// passport need ability to serialize and unserialize users out of session

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

// =============================================================================
// LOCAL SIGNUP
// =============================================================================
// using named strategies since we have one for login and one for signup
// by default, if there was no name, it would be called local
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and pw, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire req to the callback
  },
  function (req, email, password, done) {

    // async
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({'local.email': email}, function(err, user) {
        // if there are any errors, return the error
        if (err) {
          return done(err);
        }

        // check to see if there's already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        else {
          // if theres no user with that email
          var newUser = new User();

          // set the user's local credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

// =============================================================================
// LOCAL LOGIN
// =============================================================================

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and pw, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back entire req in callback
  },
  function(req, email, password, done) { // cb with email and pw from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({'local.email': email}, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err) {
        return done(err);
      }

      // if no user is found, return the message
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }

      // if the user is found but the password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));
      }

      // all is well, return successful user
      return done(null, user);
    });
  }));
};
