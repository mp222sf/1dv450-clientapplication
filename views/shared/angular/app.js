angular.module("demoApp", ['ngRoute', 'uiGmapgoogle-maps', 'ngCookies'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'views/map.html',
          controller: 'MapController',
          controllerAs: 'map'
        }).
        when('/error', {
          templateUrl: 'views/shared/error.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        otherwise({
          redirectTo: '/'
        });
      $locationProvider.html5Mode(true);
    }])
  .constant('ApiConfig', {
    'key'   : "?key=83f8f2cebf797ef2a8594fc6f081e61a4eef892e",
    'path'   : "https://webbramverk-1dv450-mp222sf.c9users.io/api/v1/"
  });