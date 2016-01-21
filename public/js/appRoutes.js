// public/js/appRoutes.js
angular.module("AppRoutes", [])
  .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

    $routeProvider
      .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController"
      })
      .when("/signup", {
        templateUrl: "views/signup.html",
        controller: "SignupController"
      })
      .when("/welcome", {
        templateUrl: "views/welcome.html",
        controller: "WelcomeController"
      })
      .when('/admin', {
        templateUrl: "views/admin.html",
        controller: "AdminController"
      })
      .otherwise({
        templateUrl: "views/login.html",
        controller: "LoginController"
      });

      $locationProvider.html5Mode(true);
  }]);
