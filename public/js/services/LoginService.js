// public/js/services/LoginService.js
angular.module("LoginService", [])
  .factory("UserLogin", ['$http', '$window', function($http, $window) {
    return {
      post: function(userData) {
        return $http.post('/api/login', userData);
      },
      fbLogin: function() {
        return $window.href = '/auth/facebook';
      },
      fbAuthenticated: function() {
        return $http.get('/auth/facebook/callback');
      }
    };
  }]);
