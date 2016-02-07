// packages
// =============================================================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session");

// configuration
// =============================================================================
var config = require("./config/db");  // get access to exports from db.js
var port = process.env.port || 8080;  // set the port to the host port or 8080
mongoose.connect(process.env.MONGOLAB_URI);          // connect the schema to the db
require('./config/passport')(passport);       // pass passport for config

//app.set('superSecret', config.secret);     // set the secret variable

// use body parser to handle req.body information on POST and GET requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log to the console
app.use(morgan('dev'));

// read cookies (needed for auth)
app.use(cookieParser());

// required for passport
app.use(session({secret: 'superSecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set the static files location /public
app.use(express.static(__dirname + '/public'));

// routes
// =============================================================================
require("./routes/routes")(app, passport);

// api routes
// =============================================================================
//require("./routes/apiRoutes")(app);

// server
// =============================================================================
app.listen(port);

console.log("Server running on port " + port);

exports = module.exports = app;
