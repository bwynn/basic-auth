// public/js/controllers/WelcomeCtrl.js
angular.module("WelcomeCtrl", [])
  .controller("WelcomeController", ["$scope", function($scope) {
    $scope.hello = "You've reached the Welcome controller";
  }]);
