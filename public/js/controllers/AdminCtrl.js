// public/js/controllers/AdminCtrl.js
angular.module("AdminCtrl", [])
  .controller("AdminController", ["$scope", "User", function($scope, User) {

    $scope.hello = "Welcome to the admin panel";
    // get users
    function getUsers() {
      // get all of the users
      User.get().then(function(users) {
        console.log(users.data);
        $scope.users = users.data;
      });
    }
    // this call is not working yet, so don't expect it to!
    //getUsers();
  }]);
