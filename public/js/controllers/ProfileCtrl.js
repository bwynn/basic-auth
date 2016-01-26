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
      var arr = []; // create array to store $scope.msg items in after stringifying them.
      var obj = {}; // create object
      obj.comment = $scope.comment; // assign message
      obj.time = new Date(); // assign timestamp
      $scope.msg.push(obj); // push to msg[]
      //console.log($scope.msg)
      // prepare the items within the array
      for (var i = 0; i < $scope.msg.length; i++) {
        var item = angular.toJson($scope.msg[i]);
        arr.push(item);
      }
      //console.log(arr); // check to make sure that the prep is handled properly
      // then
      // put the msg[] back to the db
      User.comment({
        comment: arr
      }).then(function() {
        getUser(); // initialize the content
      });
    };

    // Relies on the UserService User object to retrieve db information and
    // setting data
    function getUser() {
      User.get().then(function(user) {
        //console.log(user.data); // check data retrieval
        $scope.user = user.data; // set scope values for user
        if ($scope.user !== undefined) {
          $scope.msg = []; // create our $scope.msg array
          for (var i = 0; i < user.data.user.details.comment.length; i++) {
            // iterate each item, unpack it from string form to be placed into scope
            var item = angular.fromJson(user.data.user.details.comment[i]);
            $scope.msg.push(item); // push item to the $scope.msg array
          }
          // console.log($scope.msg); // check to make sure it was properly unpacked
        }
      }).then(function() {
        $scope.comment = ""; // clear out the input field
      });
    }

    // create initialize package
    function init() {
      getUser();
    }

    init(); // initialize 
  }]);
