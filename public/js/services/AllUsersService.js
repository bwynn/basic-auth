// public/js/services/AllUsersService.js
angular.module("AllUsersService", [])
  .factory("AllUsers", ["$http", function($http) {
    return {
      get: function() {
        return $http.get('/api/users');
      }
    };
  }]);
