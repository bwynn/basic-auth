// packages
var path = require("path");

// model schema requirements
var User = require('../models/user');

module.exports = function(app, passport) {
// server routes
// =============================================================================

// login routes
// =============================================================================
// get user details
  // get
  // app.get('/login', cb);
  app.get('/login', function(req, res) {

    res.json({message: "Welcome to the login page!"});
  });

  // post
  // app.post('/login', cb);
  // route to authenticate a user (POST http://localhost:8080/login)
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the login page
    failureFlash: true // allow flash messages
  }));

// sign-up routes
// =============================================================================
// to create a new user
// get
// app.get('/signin', cb);
app.get('/signup', function(req, res) {
  res.json({message: "At the sign up page"});
});

// post
// app.post('/sign-in', cb);
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to secure profile
  failureRedirect: '/', // redirect the back to the signup page
  failureFlash: true // allow flash messages
}));

// profile routes
// =============================================================================
  // get
  // app.get('/welcome', cb)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.json({user: req.user});
  });

// logout routes
// =============================================================================
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// ADMIN ROUTES
// =============================================================================
  app.get('/admin', function(req, res) {
    res.json({message: "Welcome to the Admin API panel"});
  });

  app.get('/admin/users', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });

// frontend routes
// =============================================================================
// set base url for app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  });
};

// route middleware to make sure user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't, redirect them to the home page
  res.redirect('/login');
}
