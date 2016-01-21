// get User Schema
var User = require("../models/user");

module.exports = function(app) {

app.get('/admin', function(req, res) {
  res.json({message: "Welcome to the Admin API panel"});
});

app.get('/admin/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

};
