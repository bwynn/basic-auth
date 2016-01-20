// model schema requirements
var User = require('./models/user');

module.exports = function(app) {
// server routes
// =============================================================================

// sign-in
// to create a new user
  // get
  // app.get('/sign-in', cb);

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
  //app.get("*", function(req, res) {
    //res.sendFile("./public/views/index.html");
  //});

};
