// public/js/controllers/LoginCtrl.js
angular.module("LoginCtrl", [])
  .controller("LoginController", ["$scope", "$location", "$route", "$routeParams", "UserLogin", function($scope, $location, $route, $routeParams, UserLogin) {
    $scope.hello = "You've reached the login controller";

    $scope.fbLogin = function() {
      console.log("click triggered as expected");
      UserLogin.fbLogin();
    };

  }]);
