angular.module("MainCtrl", [])
  .controller("MainController", ["$scope", "$location", "$route", "$routeParams", "AllUsers", function($scope, $location, $route, $routeParams, AllUsers) {

    function getUsers() {
      // get all of the users
      AllUsers.get().then(function(users) {
        //console.log(users.data);
        $scope.users = users.data;
      });
    }

    // this route provider will generate the individual view when a user clicks on
    // an individual trails details. The path provided is relative to the
    // key declared on the individual view
    /*$scope.$on("$routeChangeSuccess", function() {
       if ($location.path().indexOf("/profile/") == 0) {
         var user_id = $routeParams["user_id"];
         for (var i = 0; i < $scope.users.length; i++) {
           if ( $scope.users[i]._id == user_id) {
             console.log($scope.users);
             $scope.currentUser = $scope.users[i];
             break;
           }
         }
       }
    });*/

    getUsers();
  }]);
