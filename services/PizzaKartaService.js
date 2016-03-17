angular
  .module("demoApp")
  .factory('PizzaKartaService', PizzaKartaService);

PizzaKartaService.$inject = ['$http', '$location', '$route'];

  function PizzaKartaService($http, $location, $route) {
    
    // Path to the API.
    var APIpath = 'https://webbramverk-1dv450-mp222sf.c9users.io';
    var APIkey = '83f8f2cebf797ef2a8594fc6f081e61a4eef892e';
    
    var onePizzeria = [];
    var markersList = [];
    var tagsList = [];
    var menusList = [];
    var dishList = [];
    
    // Creates a Marker object.
    function createMarker (id, name, lat, lng, address, tags, menus) {
      var ret = {
        latitude: lat,
        longitude: lng,
        title: name,
        id: id,
        address: address,
        tags: tags,
        menus : menus
      };
      
      return ret;
    }
    
    // Creates a Tag object.
    function createTag (id, name, link) {
      var ret = {
        id: id,
        name: name,
        link: link
      };
      
      return ret;
    }
    
    // Creates a Menu object.
    function createMenu (id, name, dishes) {
      var ret = {
        id: id,
        name: name,
        dishes : dishes
      };
      
      return ret;
    }
    
    // Creates a Dish object.
    function createDish (id, name, ingredients, price) {
      var ret = {
        id: id,
        name: name,
        ingredients: ingredients,
        price : price
      };
      
      return ret;
    }

    // GET: Pizzeria, all
    function fetchPizzerias(){
      markersList = [];
      $http.get(APIpath + "/api/v1/pizzerias?key=" + APIkey)
      .then(function(response){ 
        for (pizzeria in response.data.pizzerias)
        {
          var menus = [];
          for (menu in response.data.pizzerias[pizzeria].menus)
          {
            var dishes = [];
            for (dish in response.data.pizzerias[pizzeria].menus[menu].dishes)
            {
              dishes.push(createDish(response.data.pizzerias[pizzeria].menus[menu].dishes[dish].id, response.data.pizzerias[pizzeria].menus[menu].dishes[dish].name, response.data.pizzerias[pizzeria].menus[menu].dishes[dish].ingredients, response.data.pizzerias[pizzeria].menus[menu].dishes[dish].price));
            }
            menus.push(createMenu(response.data.pizzerias[pizzeria].menus[menu].id, response.data.pizzerias[pizzeria].menus[menu].name, dishes));
          }
          markersList.push(createMarker(response.data.pizzerias[pizzeria].id, response.data.pizzerias[pizzeria].name, response.data.pizzerias[pizzeria].latitude, response.data.pizzerias[pizzeria].longitude, response.data.pizzerias[pizzeria].address, undefined, menus));
        }
      });
    }
    
    // GET: Pizzeria, id
    function fetchOnePizzeria(id){
      onePizzeria = [];
      $http.get(APIpath + "/api/v1/pizzerias/" + id + "?key=" + APIkey)
      .then(function(response){ 
        onePizzeria.push(createMarker(response.data.pizzeria.id, response.data.pizzeria.name, response.data.pizzeria.position.latitude, response.data.pizzeria.position.longitude, response.data.pizzeria.position.address, response.data.pizzeria.tags));
      });
      
    }

    // GET: Tags, all
    function fetchTags(){
      tagsList = [];
      $http.get(APIpath + "/api/v1/tags?key=" + APIkey)
      .then(function(response){ 
        for (tag in response.data.tags)
        {
          tagsList.push(createTag(response.data.tags[tag].id, response.data.tags[tag].name, response.data.tags[tag].link));
        }
      });
    }
  
    // GET: Pizzeria, all, by Tag
    function fetchPizzeriasByTag(id){
      markersList = [];
      $http.get(APIpath + "/api/v1/tags/" + id + "/pizzerias?key=" + APIkey)
      .then(function(response){ 
        for (pizzeria in response.data.pizzerias)
        {
          markersList.push(createMarker(pizzeria, response.data.pizzerias[pizzeria].name, response.data.pizzerias[pizzeria].latitude, response.data.pizzerias[pizzeria].longitude, response.data.pizzerias[pizzeria].address));
        }
      });
    }
    
    // GET: Menu, all, by Pizzeria
    function fetchMenusByPizzeria(id){
      menusList = [];
      $http.get(APIpath + "/api/v1/pizzerias/" + id + "/menus?key=" + APIkey)
      .then(function(response){ 
        
        for (menu in response.data.menus)
        {
          var dishes = [];
          for (dish in response.data.menus[menu].dishes)
          {
            dishes.push(createDish(response.data.menus[menu].dishes[dish].id, response.data.menus[menu].dishes[dish].name, response.data.menus[menu].dishes[dish].ingredients, response.data.menus[menu].dishes[dish].price));
          }
          menusList.push(createMenu(response.data.menus[menu].id, response.data.menus[menu].name, dishes));
        }
      });
    }
    
    // GET: Menu, by Id
    function fetchMenusById(id){
      menusList = [];
      $http.get(APIpath + "/api/v1/menus/" + id + "?key=" + APIkey)
      .then(function(response){ 
        
          var dishes = [];
          for (dish in response.data.menu.dishes)
          {
            dishes.push(createDish(response.data.menu.dishes[dish].id, response.data.menu.dishes[dish].name, response.data.menu.dishes[dish].ingredients, response.data.menu.dishes[dish].price));
          }
          menusList.push(createMenu(response.data.menu.id, response.data.menu.name, dishes));
      });
    }
    
    // GET: Dish, by Id
    function fetchDishById(id){
      dishList = [];
      $http.get(APIpath + "/api/v1/dishes/" + id + "?key=" + APIkey)
      .then(function(response){ 
        dishList.push(createDish(response.data.dish.id, response.data.dish.name, response.data.dish.ingredients, response.data.dish.price));
      });
    }
    
    // POST: Pizzeria.
    function postPizzeria(username, password, name, address, tagOne, tagTwo, tagThree, tagFour, tagFive){
      var tagObjects = [];
      
      if (tagOne != "")
      {
        tagObjects.push({ name : tagOne });
      }
      if (tagTwo != "")
      {
        tagObjects.push({ name : tagTwo });
      }
      if (tagThree != "")
      {
        tagObjects.push({ name : tagThree });
      }
      if (tagFour != "")
      {
        tagObjects.push({ name : tagFour });
      }
      if (tagFive != "")
      {
        tagObjects.push({ name : tagFive });
      }
      
      

      var data = JSON.stringify({
                    pizzeria : {
                      name : name,
                      position : {
                        address : address
                      },
                      creator : {
                        firstName : "The",
                        lastName : "Admin"
                      },
                      tags : tagObjects
                    }
                  });

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.post(APIpath + "/api/v1/pizzerias?key=" + APIkey, data, config)
      .then(function(response){ 
        $location.path('/admin/successCreate');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // POST: Menu.
    function postMenu(username, password, name, pizzeriaId){
      var data = JSON.stringify({
                    menu : {
                      name : name,
                      pizzeria_id : pizzeriaId
                    }
                  });

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.post(APIpath + "/api/v1/menus?key=" + APIkey, data, config)
      .then(function(response){ 
        $location.path('/admin/successCreate');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // POST: Dish.
    function postDish(username, password, name, ingredients, price, menuId){
      var data = JSON.stringify({
                    dish : {
                      name : name,
                      ingredients : ingredients,
                      price : price,
                      menu_id : menuId
                    }
                  });

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.post(APIpath + "/api/v1/dishes?key=" + APIkey, data, config)
      .then(function(response){ 
        $location.path('/admin/successCreate');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // POST: PizzeriaTag.
    function postPizzeriaTag(username, password, pizzeriaId, tagId){
      var data = JSON.stringify({
                    pizzeriaTag : {
                      pizzeria_id : pizzeriaId,
                      tag_id : tagId
                    }
                  });

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.post(APIpath + "/api/v1/pizzeriatags?key=" + APIkey, data, config)
      .then(function(response){ 
        $location.path('/admin/successCreate');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // DELETE: Pizzeria.
    function deletePizzeria(username, password, pizzeriaId){

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.delete(APIpath + "/api/v1/pizzerias/" + pizzeriaId + "?key=" + APIkey, config)
      .then(function(response){ 
        $location.path('/admin/successDelete');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // DELETE: Menu.
    function deleteMenu(username, password, menuId){

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.delete(APIpath + "/api/v1/menus/" + menuId + "?key=" + APIkey, config)
      .then(function(response){ 
        $location.path('/admin/successDelete');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // DELETE: Dish.
    function deleteDish(username, password, dishId){

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.delete(APIpath + "/api/v1/dishes/" + dishId + "?key=" + APIkey, config)
      .then(function(response){ 
        $location.path('/admin/successDelete');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // PUT: Position.
    function editPosition(username, password, id, address){
      
      var data = JSON.stringify({
                    position : {
                      address : address
                    }
                  });

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.put(APIpath + "/api/v1/positions/" + id + "?key=" + APIkey, data, config)
      .then(function(response){ 
        $location.path('/admin/successEdit');
      }, function (error) {
        $location.path('/error');
      });
    }
    
    // PUT: Dish.
    function editDish(username, password, id, name, ingredients, price){
      
      var data = JSON.stringify({
                    dish : {
                      name : name,
                      ingredients : ingredients,
                      price : price
                    }
                  });

      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.put(APIpath + "/api/v1/dishes/" + id + "?key=" + APIkey, data, config)
      .then(function(response){ 
        $location.path('/admin/successEdit');
      }, function (error) {
        $location.path('/error');
      });
    }

    return {
      // RETURN: Pizzeria, all
      getAllPizzerias: function() {
        fetchPizzerias();
        return markersList;
      },
      
      // RETURN: Tag, all
      getTags: function() {
        fetchTags();
        return tagsList;     
      },
      
      // RETURN: Tag, by Pizzeria
      getPizzeriasByTag: function(id) {
        fetchPizzeriasByTag(id);
        return markersList;     
      },
      
      // RETURN: Pizzeria, by Id
      getOnePizzeria: function(id) {
        fetchOnePizzeria(id);
        return onePizzeria;     
      },
      
      // RETURN: Menu, by Pizzeria
      getMenusByPizzeria: function(id) {
        fetchMenusByPizzeria(id);
        return menusList;     
      },
      
      // RETURN: Menu, by Id
      getMenusById: function(id) {
        fetchMenusById(id);
        return menusList;     
      },
      
      // RETURN: Dish, by Id
      getDishById: function(id) {
        fetchDishById(id);
        return dishList;     
      },
      
      // POST: Pizzeria 
      postPizzeria: function(username, password, name, address, tagOne, tagTwo, tagThree, tagFour, tagFive) {
        postPizzeria(username, password, name, address, tagOne, tagTwo, tagThree, tagFour, tagFive);
        return "";     
      },
      
      // POST: Menu
      postMenu: function(username, password, name, pizzeriaId) {
        postMenu(username, password, name, pizzeriaId);
        return "";     
      },
      
      // POST: Dish
      postDish: function(username, password, name, ingredients, price, menuId) {
        postDish(username, password, name, ingredients, price, menuId);
        return "";     
      },
      
      // POST: PizzeriaTag
      postPizzeriaTag: function(username, password, pizzeriaId, tagId) {
        postPizzeriaTag(username, password, pizzeriaId, tagId);
        return "";     
      },
      
      // DELETE: Pizzeria
      deletePizzeria: function(username, password, pizzeriaId) {
        deletePizzeria(username, password, pizzeriaId);
        return "";     
      },
      
      // DELETE: Menu
      deleteMenu: function(username, password, menuId) {
        deleteMenu(username, password, menuId);
        return "";     
      },
      
      // DELETE: Dish
      deleteDish: function(username, password, dishId) {
        deleteDish(username, password, dishId);
        return "";     
      },
      
      // PUT: Position
      editPosition: function(username, password, id, address) {
        editPosition(username, password, id, address);
        return "";     
      },
      
      // PUT: Dish
      editDish: function(username, password, id, name, ingredients, price) {
        editDish(username, password, id, name, ingredients, price);
        return "";     
      }
    };
  }