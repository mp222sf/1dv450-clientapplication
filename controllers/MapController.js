angular
  .module("demoApp")
  .controller("MapController", MapController)
  .directive('ngConfirmClick', [
    function(){
      return {
        priority: -1,
        restrict: 'A',
        link: function(scope, element, attrs){
          element.bind('click', function(e){
            var message = attrs.ngConfirmClick;
            if(message && !confirm(message)){
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          });
        }
      }
    }
  ]);

MapController.$inject = ['PizzaKartaService', '$cookies', '$cookieStore', '$http'];

function MapController(PizzaKartaService, $cookies, $cookieStore, $http) {
  var vm = this;
  
  // Gets all Pizzerias and Tags.
  getPizzerias();
  getTags();
  vm.start = { center: { latitude: 0, longitude: 0 }, zoom: 1 };
  
  // When started.
  showNoneMiddle();
  showNoneRight();
  vm.isLoggedIn = false;
  vm.pizzeriasShow = true;
  checkIfLoggedIn();
  
  // GET: Pizzeria, by Tag
  vm.getMarkersByTag = function (id) {
    vm.markersList = PizzaKartaService.getPizzeriasByTag(id);
    vm.showAllPizzerias();
  };
  
  // RETURNS: All markers
  vm.getMarkers = function() {
    return vm.markersList;
  };
  
  // GET: All pizzerias, menus, dishes.
  function getPizzerias() {
    vm.markersList = PizzaKartaService.getAllPizzerias();
  }
  
  // GET: All tags.
  function getTags() {
    vm.tagsList = PizzaKartaService.getTags();
  }
  
  // GET: All menus.
  function getAllMenus() {
    vm.allMenus = [];
    for (var p in vm.markersList) {
      for (var m in vm.markersList[p].menus) {
        vm.markersList[p].menus[m].pizzeria_id = vm.markersList[p].id;
        vm.allMenus.push(vm.markersList[p].menus[m]);
      }
    }
  }
  
  // GET: All dishes.
  function getAllDishes() {
    getAllMenus();
    vm.allDishes = [];
    for (var m in vm.allMenus) {
      for (var d in vm.allMenus[m].dishes) {
        vm.allMenus[m].dishes[d].menu_id = vm.allMenus[m].id;
        vm.allDishes.push(vm.allMenus[m].dishes[d]);
      }
    }
  }
  
  // GET: Pizzerias by Search word
  vm.search = function (word) {
    if (word != undefined)
    {
      if (word.length > 0)
      {
        vm.markersList = PizzaKartaService.getPizzeriasBySearchWord(word);
        vm.showAllPizzerias();
      }
      else {
        getPizzerias();
        vm.showAllPizzerias();
      }
    }
  };
  
  // Attempts to log in a User.
  vm.toLogin = function (username, password) {
    PizzaKartaService.login(username, password, function(data) {
      if (data.status == 200)
      {
        vm.message = "";
        $cookieStore.put('loginSession', data.data.token);
        vm.isLoggedIn = true;
        vm.adminStart = true;
      }
      else {
        vm.message = "Felaktiga inloggningsuppgifter.";
      }
    });
  };
  
  // Logout the User.
  vm.logout = function () {
    $cookieStore.remove("loginSession");
    vm.isLoggedIn = false;
  };
  
  // Checks if the User is logged in.
  function checkIfLoggedIn() {
    if ($cookieStore.get('loginSession') != undefined)
    {
      PizzaKartaService.checkAuthStatus($cookieStore.get('loginSession'), function(data) {
        if (data.status == 200)
        {
          vm.isLoggedIn = true;
          vm.adminStart = true;
        }
      });
    }
  }
  
  // Clears the middle column.
  function showNoneMiddle() {
    vm.pizzeriasShow = false;
    vm.pizzeriaOneShow = false;
    vm.menuOneShow = false;
  }
  
  // Clears the right column.
  function showNoneRight() {
    vm.createPizzeria = false;
    vm.createMenu = false;
    vm.createDish = false;
    vm.deletePizzeriaShow = false;
    vm.deleteMenuShow = false;
    vm.deleteDishShow = false;
    vm.editPizzeriaShow = false;
    vm.editPizzeriaShowOne = false;
    vm.editMenuShow = false;
    vm.editMenuShowOne = false;
    vm.editDishShow = false;
    vm.editDishShowOne = false;
    vm.adminStart = false;
    vm.successBox = false;
    vm.errorBox = false;
  }
  
  // Shows the Adminstart view
  vm.showAdminStart = function () {
    showNoneRight();
    vm.adminStart = true;
  };
  
  // Shows all pizzerias
  vm.showAllPizzerias = function () {
    showNoneMiddle();
    vm.pizzeriasShow = true;
  };
  
  // Shows one pizzeria
  vm.showOnePizzeria = function (id) {
    showNoneMiddle();
    
    for (var p in vm.markersList) {
      if (vm.markersList[p].id == id)
      {
        vm.pizzeriaOneObject = vm.markersList[p];
        break;
      }
    }
    getAllDishes();
    vm.pizzeriaOneShow = true;
  };
  
  // Shows one menu
  vm.showOneMenu = function (id) {
    showNoneMiddle();
    getAllDishes();
    
    for (var m in vm.allMenus) {
      if (vm.allMenus[m].id == id)
      {
        vm.menuOneObject = vm.allMenus[m];
        break;
      }
    }
    vm.menuOneShow = true;
  };
  
  // Shows create pizzeria form
  vm.showCreatePizzeria = function () {
    showNoneRight();
    vm.createPizzeria = true;
  };
  
  // Shows create menu form
  vm.showCreateMenu = function () {
    showNoneRight();
    vm.createMenu = true;
  };
  
  // Shows create dish form
  vm.showCreateDish = function () {
    getAllMenus();
    showNoneRight();
    vm.createDish = true;
  };
  
  // Shows delete pizzeria view
  vm.showDeletePizzeria = function () {
    showNoneRight();
    vm.deletePizzeriaShow = true;
  };
  
  // Shows delete menu view
  vm.showDeleteMenu = function () {
    getAllMenus();
    showNoneRight();
    vm.deleteMenuShow = true;
  };
  
  // Shows delete dish view
  vm.showDeleteDish = function () {
    getAllDishes();
    showNoneRight();
    vm.deleteDishShow = true;
  };
  
  // Shows edit pizzeria view
  vm.showEditPizzeria = function () {
    showNoneRight();
    vm.editPizzeriaShow = true;
  };
  
  // Shows edit pizzeria form
  vm.showEditPizzeriaOne = function (id) {
    showNoneRight();
    
    for (var p in vm.markersList) {
      if (vm.markersList[p].id == id)
      {
        vm.editPizzeriaObject = vm.markersList[p];
        break;
      }
    }
    
    vm.editPizzeriaShowOne = true;
  };
  
  // Shows edit menu view
  vm.showEditMenu = function () {
    getAllMenus();
    showNoneRight();
    vm.editMenuShow = true;
  };
  
  // Shows edit menu form
  vm.showEditMenuOne = function (id) {
    showNoneRight();
    
    for (var m in vm.allMenus) {
      if (vm.allMenus[m].id == id)
      {
        vm.editMenuObject = vm.allMenus[m];
        break;
      }
    }
    
    vm.editMenuShowOne = true;
  };
  
  // Shows edit dish view
  vm.showEditDish = function () {
    getAllDishes();
    showNoneRight();
    vm.editDishShow = true;
  };
  
  // Shows edit dish form
  vm.showEditDishOne = function (id) {
    showNoneRight();
    
    for (var d in vm.allDishes) {
      if (vm.allDishes[d].id == id)
      {
        vm.editDishObject = vm.allDishes[d];
        break;
      }
    }
    
    vm.editDishShowOne = true;
  };
  
  // CREATE: Pizzeria
  vm.newPizzeria = function (name, address, tagOne, tagTwo, tagThree, tagFour, tagFive) {
    PizzaKartaService.postPizzeria(name, address, tagOne, tagTwo, tagThree, tagFour, tagFive, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du la till en pizzeria!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
        vm.formCreatePizzeria = {};
        vm.createPizzeriaForm.$setPristine();
        vm.createPizzeriaForm.$setUntouched();
      }
      else {
        vm.errorMessage = "Det gick inte att lägga till pizzeria!";
        vm.errorBox = true;
      }
    });
  };
  
  // CREATE: Menu
  vm.newMenu = function (name, pizzeriaId) {
    PizzaKartaService.postMenu(name, pizzeriaId, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du la till en meny!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
        vm.formCreateMenu = {};
        vm.createMenuForm.$setPristine();
        vm.createMenuForm.$setUntouched();
      }
      else {
        vm.errorMessage = "Det gick inte att lägga till menyn!";
        vm.errorBox = true;
      }
    });
  };
  
  // CREATE: Dish
  vm.newDish = function (name, ingredients, price, menuId) {
    PizzaKartaService.postDish(name, ingredients, price, menuId, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du la till en maträtt!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
        vm.formCreateDish = {};
        vm.createDishForm.$setPristine();
        vm.createDishForm.$setUntouched();
      }
      else {
        vm.errorMessage = "Det gick inte att lägga till maträtten!";
        vm.errorBox = true;
      }
    });
  };
  
  // DELETE: Pizzeria
  vm.deletePizzeria = function (id) {
    PizzaKartaService.deletePizzeria(id, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du raderade en pizzeria!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
      }
      else {
        vm.errorMessage = "Det gick inte att radera pizzerian!";
        vm.errorBox = true;
      }
    });
  };
  
  // DELETE: Menu
  vm.deleteMenu = function (id) {
    PizzaKartaService.deleteMenu(id, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du raderade en meny!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
      }
      else {
        vm.errorMessage = "Det gick inte att radera menyn!";
        vm.errorBox = true;
      }
    });
  };
  
  // DELETE: Dish
  vm.deleteDish = function (id) {
    PizzaKartaService.deleteDish(id, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du raderade en maträtt!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
      }
      else {
        vm.errorMessage = "Det gick inte att radera maträtten!";
        vm.errorBox = true;
      }
    });
  };
  
  // PUT: Position
  vm.editPosition = function (id, address) {
    PizzaKartaService.editPosition(id, address, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du ändrade pizzerian!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
      }
      else {
        vm.errorMessage = "Det gick inte att ändra pizzerian!";
        vm.errorBox = true;
      }
    });
  };
  
  // PUT: Menu
  vm.editMenu = function (id, name, pizzeria_id) {
    PizzaKartaService.editMenu(id, name, pizzeria_id, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du ändrade menyn!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
      }
      else {
        vm.errorMessage = "Det gick inte att ändra menyn!";
        vm.errorBox = true;
      }
    });
  };
  
  // PUT: Menu
  vm.editDish = function (id, name, ingredients, price, menu_id) {
    PizzaKartaService.editDish(id, name, ingredients, price, menu_id, function(data) {
      if (data.status == 200)
      {
        vm.successMessage = "Du ändrade maträtten!";
        showNoneRight();
        vm.successBox = true;
        vm.adminStart = true;
        getPizzerias();
      }
      else {
        vm.errorMessage = "Det gick inte att ändra maträtten!";
        vm.errorBox = true;
      }
    });
  };
}