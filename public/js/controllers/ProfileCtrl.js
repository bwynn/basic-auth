// public/js/controllers/WelcomeCtrl.js
angular.module("ProfileCtrl", [])
  .controller("ProfileController", ["$scope", "User", function($scope, User) {
    $scope.hello = "Your Profile page. Welcome Home.";

    function getUser() {
      User.get().then(function(user) {
        console.log(user.data);
        $scope.user = user.data;
      });
    }

    getUser();
  }]);
