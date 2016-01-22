// public/js/services/LoginService.js
angular.module("UserService", [])
  .factory("User", ['$http', function($http) {
    return {
      // get all users
      get: function() {
        return $http.get('/profile');
      },
      post: function(userData) {
        return;
      }
    };
  }]);
