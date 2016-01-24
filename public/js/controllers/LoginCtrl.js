// public/js/controllers/LoginCtrl.js
angular.module("LoginCtrl", [])
  .controller("LoginController", ["$scope", "$location", "$route", "$routeParams", "UserLogin", function($scope, $location, $route, $routeParams, UserLogin) {
    $scope.hello = "You've reached the login controller";

    function getCredentials() {
      User.get().then(function(data) {
        console.log(data);
      });
    }

    /*$scope.changeView = function() {
      // this function is called on submit, which uses the loginservice to
      // handle post requests to the db, based on params set up
      UserLogin.post({
        email: $scope.email,
        password: $scope.password
      }).then(function() {
        console.log("post successful");
        $location.path('/profile');
      });
    };*/
  }]);
