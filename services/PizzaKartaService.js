angular
  .module("demoApp")
  .factory('PizzaKartaService', PizzaKartaService);

PizzaKartaService.$inject = ['$http', '$cookies', '$cookieStore', 'ApiConfig'];

  function PizzaKartaService($http, $cookies, $cookieStore, ApiConfig) {
    
    var loginCookie = $cookieStore.get('loginSession');
    
    var markersList = [];
    var tagsList = [];
    
    function postHttp(link, data, callback) {
      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                      }
                    };
      
      $http.post(link, data, config)
      .then(function(response){ 
        callback(response);
      }, function (error) {
        callback(error);
      });
    }
    
    function deleteHttp(link, data, callback) {
      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                      }
                    };
      
      $http.delete(link, data, config)
      .then(function(response){ 
        callback(response);
      }, function (error) {
        callback(error);
      });
    }
    
    function putHttp(link, data, callback) {
      var config = {
                      headers: { 
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                      }
                    };
      
      $http.put(link, data, config)
      .then(function(response){ 
        callback(response);
      }, function (error) {
        callback(error);
      });
    }
    
    // Creates a Marker object.
    function createMarker (id, name, lat, lng, address, tags, menus, position_id) {
      var ret = {
        latitude: lat,
        longitude: lng,
        title: name,
        id: id,
        position_id: position_id,
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
    
    // Creates a list of Pizzerias
    function createPizzeriaList(data) {
      for (var pizzeria in data)
      {
        var menus = [];
        for (var menu in data[pizzeria].menus)
        {
          var dishes = [];
          for (var dish in data[pizzeria].menus[menu].dishes)
          {
            dishes.push(createDish(data[pizzeria].menus[menu].dishes[dish].id, data[pizzeria].menus[menu].dishes[dish].name, data[pizzeria].menus[menu].dishes[dish].ingredients, data[pizzeria].menus[menu].dishes[dish].price));
          }
          menus.push(createMenu(data[pizzeria].menus[menu].id, data[pizzeria].menus[menu].name, dishes));
        }
        markersList.push(createMarker(data[pizzeria].id, data[pizzeria].name, data[pizzeria].latitude, data[pizzeria].longitude, data[pizzeria].address, undefined, menus, data[pizzeria].position_id));
      }
    }

    // GET: Pizzeria, all
    function fetchPizzerias(){
      markersList = [];
      $http.get(ApiConfig.path + "pizzerias" + ApiConfig.key)
      .then(function(response){ 
        createPizzeriaList(response.data.pizzerias);
      });
    }

    // GET: Tags, all
    function fetchTags(){
      tagsList = [];
      $http.get(ApiConfig.path + "tags" + ApiConfig.key)
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
      $http.get(ApiConfig.path + "tags/" + id + "/pizzerias" + ApiConfig.key)
      .then(function(response){ 
        createPizzeriaList(response.data.pizzerias);
      });
    }
    
    // GET: Pizzeria, by Search word
    function fetchPizzeriasBySearchWord(word){
      markersList = [];
      $http.get(ApiConfig.path + "search/" + word + ApiConfig.key)
      .then(function(response){ 
        createPizzeriaList(response.data.pizzerias);
      });
    }
    
    // POST: Pizzeria.
    function postPizzeria(name, address, tagOne, tagTwo, tagThree, tagFour, tagFive, callback){
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
                    token : loginCookie,
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
      
      postHttp(ApiConfig.path + "pizzerias" + ApiConfig.key, data, callback);
    }
    
    // POST: Menu.
    function postMenu(name, pizzeriaId, callback){
      var data = JSON.stringify({
                    token : loginCookie,
                    menu : {
                      name : name,
                      pizzeria_id : pizzeriaId
                    }
                  });
      
      postHttp(ApiConfig.path + "menus" + ApiConfig.key, data, callback);
    }
    
    // POST: Dish.
    function postDish(name, ingredients, price, menuId, callback){
      var data = JSON.stringify({
                    token : loginCookie,
                    dish : {
                      name : name,
                      ingredients : ingredients,
                      price : price,
                      menu_id : menuId
                    }
                  });

      postHttp(ApiConfig.path + "dishes" + ApiConfig.key, data, callback);
    }
    
    // DELETE: Pizzeria.
    function deletePizzeria(pizzeriaId, callback){
      var data = JSON.stringify({
                    token : loginCookie
                  });

      deleteHttp(ApiConfig.path + "pizzerias/" + pizzeriaId + ApiConfig.key, data, callback);
    }
    
    // DELETE: Menu.
    function deleteMenu(menuId, callback){
      var data = JSON.stringify({
                    token : loginCookie
                  });
                
      deleteHttp(ApiConfig.path + "menus/" + menuId + ApiConfig.key, data, callback);
    }
    
    // DELETE: Dish.
    function deleteDish(dishId, callback){
      var data = JSON.stringify({
                    token : loginCookie
                  });
                  
      deleteHttp(ApiConfig.path + "dishes/" + dishId + ApiConfig.key, data, callback);
    }
    
    // PUT: Position.
    function editPosition(id, address, callback){
      
      var data = JSON.stringify({
                    token : loginCookie,
                    position : {
                      address : address
                    }
                  });
      
      putHttp(ApiConfig.path + "positions/" + id + ApiConfig.key, data, callback);
    }
    
    // PUT: Menu.
    function editMenu(id, name, pizzeria_id, callback){
      
      var data = JSON.stringify({
                    token : loginCookie,
                    menu : {
                      name : name,
                      pizzeria_id : pizzeria_id
                    }
                  });

      putHttp(ApiConfig.path + "menus/" + id + ApiConfig.key, data, callback);
    }
    
    // PUT: Dish.
    function editDish(id, name, ingredients, price, menu_id, callback){
      
      var data = JSON.stringify({
                    token : loginCookie,
                    dish : {
                      name : name,
                      ingredients : ingredients,
                      price : price,
                      menu_id : menu_id
                    }
                  });
      
      putHttp(ApiConfig.path + "dishes/" + id + ApiConfig.key, data, callback);
    }
    
    // POST: Login.
    function login(username, password, callback){
      var data = JSON.stringify({

                    });
      
      var config = {
                      headers: { 
                        "Authorization" : "Basic " + window.btoa(username + ":" + password)
                      }
                    };
      
      $http.post(ApiConfig.path + "apiLogin" + ApiConfig.key, data, config)
        .then(
          function(response){ 
            callback(response);
          },
          function (error) {
            callback(error);
          }
        );
    }
    
    // POST: Checks if the User is logged in.
    function checkAuthStatus(token, callback){
      var data = JSON.stringify({
                      token : token
                    });

      postHttp(ApiConfig.path + "apiAuth" + ApiConfig.key, data, callback);
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
      
      // RETURN: Pizzeria, by Search word
      getPizzeriasBySearchWord: function(word) {
        fetchPizzeriasBySearchWord(word);
        return markersList;
      },
      
      // POST: Pizzeria 
      postPizzeria: function(name, address, tagOne, tagTwo, tagThree, tagFour, tagFive, callback) {
        postPizzeria(name, address, tagOne, tagTwo, tagThree, tagFour, tagFive, callback);
      },
      
      // POST: Menu
      postMenu: function(name, pizzeriaId, callback) {
        postMenu(name, pizzeriaId, callback);
      },
      
      // POST: Dish
      postDish: function(name, ingredients, price, menuId, callback) {
        postDish(name, ingredients, price, menuId, callback);
      },
      
      // DELETE: Pizzeria
      deletePizzeria: function(pizzeriaId, callback) {
        deletePizzeria(pizzeriaId, callback);
      },
      
      // DELETE: Menu
      deleteMenu: function(menuId, callback) {
        deleteMenu(menuId, callback);
      },
      
      // DELETE: Dish
      deleteDish: function(dishId, callback) {
        deleteDish(dishId, callback);
      },
      
      // PUT: Position
      editPosition: function(id, address, callback) {
        editPosition(id, address, callback);
      },
      
      // PUT: Menu
      editMenu: function(id, name, pizzeria_id, callback) {
        editMenu(id, name, pizzeria_id, callback);
      },
      
      // PUT: Dish
      editDish: function(id, name, ingredients, price, menu_id, callback) {
        editDish(id, name, ingredients, price, menu_id, callback);
      },
      
      // POST: Login
      login: function(username, password, callback) {
        login(username, password, callback);
      },
      
      // POST: Checks if the User is logged in.
      checkAuthStatus: function(token, callback) {
        checkAuthStatus(token, callback);
      }
    };
  }