// packages
var path = require("path");

// model schema requirements
var User = require('../models/user');
var Post = require('../models/post');

module.exports = function(app, passport) {
// server routes
// =============================================================================
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

  // facebook login routes
  // ===========================================================================
  // route for facebook authentication and login
  /*app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }));*/

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
    // using the req.session.passport.user value (which is the _id in db)
    // to query db, and then checks login status using the isLoggedIn cb
    // to determine the read/write permissions for the page.
    console.log(req.session.passport.user);
    User.findOne({"_id": req.session.passport.user}, function(err, user) {
      if (err) {
        res.send(err);
      }
      //console.log(req.body.email);
      //console.log(req.body);

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

  // put new comment/message
  app.put('/api/profile/comment', isLoggedIn, function(req, res) {
    User.findOne({"_id": req.session.passport.user}, function(err, user) {
      if (err) {
        res.send(err);
      }
      console.log(req.body);

      user.details.comment = req.body.comment;

      user.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({message: "User comments updated"});
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
    User.find({"details.comment": {$exists: true}}, function(err, users) {
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
