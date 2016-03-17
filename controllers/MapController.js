angular
  .module("demoApp")
  .controller("MapController", MapController);

MapController.$inject = ['$routeParams', 'PizzaKartaService', '$http'];


function MapController($routeParams, PizzaKartaService, $http) {
  var vm = this;
  var theMarkers = PizzaKartaService.getAllPizzerias();
  vm.markersList = theMarkers;
  var theTags = PizzaKartaService.getTags();
  vm.tagsList = theTags;
  vm.start = { center: { latitude: 0, longitude: 0 }, zoom: 1 };
  
  // GET: Pizzeria, by Tag
  vm.getMarkersByTag = function (id) {
    vm.markersList = PizzaKartaService.getPizzeriasByTag(id);
  }
}