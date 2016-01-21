// model schema requirements
var User = require('./models/user');

// packages
var path = require("path");

module.exports = function(app) {
// server routes
// =============================================================================

// sign-up
// to create a new user
  // get
  // app.get('/signin', cb);
  app.get('/signup', function(req, res) {
    res.json({message: "At the sign up page"});
  })

  // post
  // app.get('/sign-in', cb);

// login
// get user details
  // get
  // app.get('/login', cb);
  app.get('/login', function(req, res) {

    res.json({message: "Welcome to the login page!"});
  });

  // post
  // app.post('/login', cb);

// welcome
  // get
  // app.get('/welcome', cb)

// frontend routes
// =============================================================================
// set base url for app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/views/index.html"));
  });

};
