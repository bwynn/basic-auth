// public/js/controllers/WelcomeCtrl.js
angular.module("ProfileCtrl", [])
  .controller("ProfileController", ["$scope", "$location", "User", function($scope, $location, User) {
    $scope.hello = "Your Profile page. Welcome Home.";

    function getUser() {
      User.get().then(function(user) {
        console.log(user.data);
        $scope.user = user.data;
      });
    }

    getUser();

    $scope.updateUser = function() {
      User.post({
        name : $scope.name,
        location: $scope.location,
        status: $scope.status
      }).then(function() {
        // if the post has been made successfully, then make sure that the
        // proper redirect is occurring using a promise
        console.log("made it to right before the redirect. Data successfully put.");
        $location.path('/profile');
      });.then(function() {
        // if that succeeded, then let's make sure we update the content
        // within the view using a promise.
        getUser();
      });
    };
  }]);
