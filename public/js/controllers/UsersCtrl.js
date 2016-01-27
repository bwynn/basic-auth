// public/js/controllers/AdminCtrl.js
angular.module("UsersCtrl", [])
  .controller("AllUsersController", ["$scope", "AllUsers", function($scope, AllUsers) {
    
    // parse comment data into individual comments
      // store comment
      // store name
      // store timestamp
    // get users
    function getUsers() {
      // get all of the users
      AllUsers.get().then(function(users) {
        //console.log(users.data);
        $scope.users = users.data;
      });
    }
    // this call is not working yet, so don't expect it to!
    getUsers();
    storeObj();
  }]);
