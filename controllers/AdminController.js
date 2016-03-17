angular
  .module("demoApp")
  .controller("AdminController", AdminController)
  .directive('myShowPizzeria', function() {
    return {
      template: '<span>{{ p.title }}</span>',
      restrict: "E"
    };
  });
  
AdminController.$inject = ['$routeParams', 'PizzaKartaService', '$http', '$location', '$cookies', '$cookieStore', '$route'];

function AdminController($routeParams, PizzaKartaService, $http, $location, $cookies, $cookieStore, $route) {

  var vm = this;
  var loginCookie = $cookieStore.get('loginSession');
  var username = "";
  var password = "";
  vm.loggedIn = false;

  // Startup function.
  var initialize = function () {
    checkIfLoggedIn();
    var pizzerias = PizzaKartaService.getAllPizzerias();
    vm.allPizzerias = pizzerias;
    
    if ($routeParams.pizzeriaId != undefined && $routeParams.pizzeriaId >= 0)
    {
      vm.onePizzeria = PizzaKartaService.getOnePizzeria($routeParams.pizzeriaId);
      vm.getMenusByPizzeria($routeParams.pizzeriaId);
    }
    
    if ($routeParams.menuId != undefined && $routeParams.menuId >= 0)
    {
      vm.getMenusById($routeParams.menuId);
    }
    
    if ($routeParams.dishId != undefined && $routeParams.dishId >= 0)
    {
      vm.getDishById($routeParams.dishId);
    }
  };
  
  // Checks if user is logged in.
  var checkIfLoggedIn = function () {
    if (loginCookie == undefined)
    {
      $location.path('/login');
    }
    else {
      if (window.atob(loginCookie) != 'admin:secret')
      {
        $location.path('/login');
      }
      else {
        vm.loggedIn = true;
        var res = window.atob(loginCookie).split(":")
        username = res[0];
        password = res[1];
      }
    }
  };
  
  // POST: Pizzeria
  vm.createPizzeria = function (name, address, tagOne, tagTwo, tagThree, tagFour, tagFive) {
    PizzaKartaService.postPizzeria(username, password, name, address, tagOne, tagTwo, tagThree, tagFour, tagFive);
  };
  
  // POST: Menu
  vm.createMenu = function (name) {
    PizzaKartaService.postMenu(username, password, name, $routeParams.pizzeriaId);
  };
  
  // POST: Dish
  vm.createDish = function (name, ingredients, price) {
    PizzaKartaService.postDish(username, password, name, ingredients, price, $routeParams.menuId);
  };
  
  // DELETE: Pizzeria
  vm.deletePizzeria = function (pizzeriaId) {
    PizzaKartaService.deletePizzeria(username, password, pizzeriaId);
  };
  
  // DELETE: Menu
  vm.deleteMenu = function (menuId) {
    PizzaKartaService.deleteMenu(username, password, menuId);
  };
  
  // DELETE: Dish
  vm.deleteDish = function (dishId) {
    PizzaKartaService.deleteDish(username, password, dishId);
  };
  
  // PUT: Position
  vm.editPosition = function (id, address) {
    PizzaKartaService.editPosition(username, password, id, address);
  };
  
  // PUT: Dish
  vm.editDish = function (id, name, ingredients, price) {
    PizzaKartaService.editDish(username, password, id, name, ingredients, price);
  };
  
  // GET: Pizzeria, all
  vm.getAllPizzerias = function () {
    var pizzerias = PizzaKartaService.getAllPizzerias();
    vm.allPizzerias = pizzerias;
  };
  
  // GET: Menu, by Pizzeria
  vm.getMenusByPizzeria = function (id) {
    var menus = PizzaKartaService.getMenusByPizzeria(id);
    vm.menusByPizzeria = menus;
  };
  
  // GET: Menu, by Id
  vm.getMenusById = function (id) {
    var menu = PizzaKartaService.getMenusById(id);
    vm.menuById = menu;
  };
  
  // GET: Dish, by Id
  vm.getDishById = function (id) {
    var dish = PizzaKartaService.getDishById(id);
    vm.dishById = dish;
  };

  initialize();
}