// packages
// =============================================================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

// configuration
// =============================================================================
var config = require("./config/db");  // get access to exports from db.js
var port = process.env.port || 8080;  // set the port to the host port or 8080
mongoose.connect(config.database);          // connect the schema to the db
app.set('secret', config.secret);     // set the secret variable

// use body parser to handle req.body information on POST and GET requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log to the console
app.use(morgan('dev'));

// set the static files location /public
app.use(express.static(__dirname + '/public'));

// routes
// =============================================================================
require("./routes")(app);

// api routes
// =============================================================================
//require("./apiRoutes")(app);

// server
// =============================================================================
app.listen(port);

console.log("Server running on port " + port);

exports = module.exports = app;
