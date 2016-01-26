// public/js/controllers/WelcomeCtrl.js
angular.module("ProfileCtrl", [])
  .controller("ProfileController", ["$scope", "$location", "User", function($scope, $location, User) {

    // set a state value to allow show/hide of editing form
    $scope.update = false;

    //$scope.user = getUser();
    // set a local representation of all of the users messages
    //console.log(user.data.user.details.comment);
    //$scope.msgs = $scope.user.details.comment;

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
    // of the db put method.
    $scope.updateUser = function() {
      User.put({
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
        $scope.update = false;
      });
    };

    // $scope.newMessage is triggered on message update
    $scope.newMessage = function() {
      // create object
      var obj = {};
      // assign message
      obj.comment = $scope.comment;
      // assign timestamp
      obj.time = new Date();
      // push to msg[]
      var str = angular.toJson(obj);
      $scope.msg.push(str);
      console.log($scope.msg);

      // then
      // put the msg[] back to the db
      User.comment({
        comment: $scope.msg
      }).then(function() {
        getUser();
      });
    };

    // Relies on the UserService User object to retrieve db information and
    // setting data
    function getUser() {
      User.get().then(function(user) {
        console.log(user.data);
        $scope.user = user.data;
        $scope.msg = [];

        for (var i = 0; i < user.data.user.details.comment.length; i++) {
          var item = angular.fromJson(user.data.user.details.comment[i])
          $scope.msg.push(item);
        }

        console.log($scope.msg);
      }).then(function() {
        $scope.comment = "";
      });
    }

    function init() {
      getUser();
    }

    init();
  }]);
