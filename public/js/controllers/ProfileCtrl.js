// public/js/controllers/WelcomeCtrl.js
angular.module("ProfileCtrl", [])
  .controller("ProfileController", ["$scope", "$location", "User", function($scope, $location, User) {

    // set a state value to allow show/hide of editing form
    $scope.update = false;

    // user interaction to determine show/hide of view elements
    $scope.edit = function() {
      if ($scope.update === false) {
        $scope.update = true;
      }
      else {
        $scope.update = false;
      }
    }

    // Utilizes the UserService factory function to provide a post to the db
    // then relies on several asynch promise resolutions based on the success
    // of the db post.
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
      }).then(function() {
        // if that succeeded, then let's make sure we update the content
        // within the view using a promise.
        getUser();
      });
    };

    // Relies on the UserService User object to retrieve db information and
    // setting data 
    function getUser() {
      User.get().then(function(user) {
        console.log(user.data);
        $scope.user = user.data;
      });
    }

    function init() {
      getUser();
    }

    init();
  }]);
