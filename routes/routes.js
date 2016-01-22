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
  app.get('/api/login', function(req, res) {

    res.json({message: "Welcome to the login page!"});
  });

  // post
  // app.post('/login', cb);
  // route to authenticate a user (POST http://localhost:8080/login)
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section - USING NON API ROUTES FOR PROPER REDIRECT
    failureRedirect: '/login', // redirect back to the login page - USING NON API ROUTES FOR PROPER REDIRECT
    failureFlash: true // allow flash messages
  }));

// sign-up routes
// =============================================================================
// to create a new user
// get
// app.get('/signin', cb);
app.get('/api/signup', function(req, res) {
  res.json({message: "At the sign up page"});
});

// post
// app.post('/sign-in', cb);
app.post('/api/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to secure profile - USING NON API ROUTES FOR PROPER REDIRECT
  failureRedirect: '/signup', // redirect the back to the signup page - USING NON API ROUTES FOR PROPER REDIRECT
  failureFlash: true // allow flash messages
}));

// profile routes
// =============================================================================
  // get
  // app.get('/welcome', cb)
  app.get('/api/profile', isLoggedIn, function(req, res) {
    res.json({user: req.user});
  });

  // put
  // app.put('/api/profile', isLoggedIn, cb)
  app.put('/api/profile', isLoggedIn, function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }

      user.details.name = req.body.name;
      user.details.location = req.body.location;
      user.details.status = req.body.status;

      user.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({message: "User successfully updated"});
      });
    });
  });

// logout routes
// =============================================================================
app.get('/api/logout', function(req, res) {
  req.logout();
  res.redirect('/api/login');
});

// USERS ROUTES
// =============================================================================
  app.get('/api/users', function(req, res) {
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
  res.redirect('/api/login');
}
