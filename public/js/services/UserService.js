// public/js/services/LoginService.js
angular.module("UserService", [])
  .factory("User", ['$http', function($http) {
    return {
      // get all users
      get: function() {
        return $http.get('/api/profile');
      },
      post: function(userData) {
        return $http.post('/api/profile', userData);
      },
      put: function(userData) {
        return $http.put('/api/profile', userData);
      }
    };
  }]);
