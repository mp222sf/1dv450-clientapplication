angular
  .module("demoApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ['PizzaKartaService', '$http', '$location', '$cookies', '$cookieStore'];

function LoginController(PizzaKartaService, $http, $location, $cookies, $cookieStore) {
  var vm = this;
  
  // Attempts to log in a user.
  vm.toLogin = function (username, password) {
    if (username == "admin" && password == "secret")
    {
      $cookieStore.put('loginSession',window.btoa(username + ":" + password));
      $location.path('/admin');
    }
    else {
      vm.message = "Felaktiga inloggningsuppgifter.";
    }
  };
}