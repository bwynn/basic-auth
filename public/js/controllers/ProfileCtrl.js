// public/js/controllers/WelcomeCtrl.js
angular.module("ProfileCtrl", [])
  .controller("ProfileController", ["$scope", function($scope) {
    $scope.hello = "Your Profile page. Welcome Home.";
  }]);
