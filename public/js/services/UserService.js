// public/js/services/LoginService.js
angular.module("UserService", [])
  .factory("User", ['$http', function($http) {
    return {
      // get all users
      get: function() {
        return $http.get('/admin/users');
      },
      post: function(userData) {
        return;
      }
    };
  }]);
