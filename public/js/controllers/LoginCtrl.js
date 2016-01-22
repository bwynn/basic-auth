// public/js/controllers/LoginCtrl.js
angular.module("LoginCtrl", [])
  .controller("LoginController", ["$scope", "User", function($scope, User) {
    $scope.hello = "You've reached the login controller";

    function getCredentials() {
      User.get().then(function(data) {
        console.log(data);
      });
    }

    $scope.changeView = function() {
      // this function is called on submit, which uses the loginservice to
      // handle post requests to the db, based on params set up
      getCredentials();
        //$location.path('/profile');
    };
  }]);
