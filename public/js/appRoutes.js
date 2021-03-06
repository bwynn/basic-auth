// public/js/appRoutes.js
angular.module("AppRoutes", [])
  .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

    $routeProvider
      .when("/", {
        templateUrl: "views/login.html",
        controller: "MainController"
      })
      .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController"
      })
      .when("/signup", {
        templateUrl: "views/signup.html",
        controller: "SignupController"
      })
      .when("/profile", {
        templateUrl: "views/profile.html",
        controller: "ProfileController"
      })
      .when('/users', {
        templateUrl: "views/users.html",
        controller: "AllUsersController"
      })
      .when('/logout', {
        templateUrl: "views/login.html",
        controller: "LoginController"
      })
      .otherwise({
        templateUrl: "views/login.html",
        controller: "LoginController"
      });

      $locationProvider.html5Mode(true);
  }]);
