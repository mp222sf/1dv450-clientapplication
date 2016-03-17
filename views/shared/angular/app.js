angular.module("demoApp", ['ngRoute', 'uiGmapgoogle-maps', 'ngCookies']) // you must inject the ngRoute (included as a separate js-file)
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'views/index.html'
        }).
        when('/map', {
          templateUrl: 'views/map.html',
          controller: 'MapController',
          controllerAs: 'map'
        }).
        when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        }).
        when('/admin', {
          templateUrl: 'views/admin.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/createPizzeria', {
          templateUrl: 'views/createPizzeria.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/createMenu/:pizzeriaId', {
          templateUrl: 'views/createMenu.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/createDish/:menuId', {
          templateUrl: 'views/createDish.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/deletePizzeria', {
          templateUrl: 'views/deletePizzeria.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/editPizzeria/:pizzeriaId', {
          templateUrl: 'views/editPizzeria.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/editPizzeria/:pizzeriaId/position', {
          templateUrl: 'views/editPizzeriaPosition.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/editMenu/:menuId', {
          templateUrl: 'views/editMenu.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/editDish/:dishId', {
          templateUrl: 'views/editDish.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/successCreate', {
          templateUrl: 'views/shared/successCreate.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/successEdit', {
          templateUrl: 'views/shared/successEdit.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/admin/successDelete', {
          templateUrl: 'views/shared/successDelete.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/error', {
          templateUrl: 'views/shared/error.html',
          controller: 'AdminController',
          controllerAs: 'admin'
        }).
        when('/players', {
          templateUrl: 'views/player-list.html',
          controller: 'PlayerListController',
          controllerAs: 'players' // players could be seen as an instance of the controller, use it in the view!
        }).
        when('/player/:id', {
          templateUrl: 'views/player-detail.html',
          controller: 'PlayerDetailController',
          controllerAs: 'player'
        }).
        otherwise({
          redirectTo: '/'
        });
      $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10

    }]);