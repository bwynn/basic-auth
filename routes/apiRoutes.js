// packages
var express = require("express");

// get User Schema
var User = require("../models/user");

module.exports = function(app) {
// get an instance of Router for API routes
var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
  res.json({message: "Welcome to the Admin API panel"});
});

apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// set url path
app.use('/admin', apiRoutes);

};
