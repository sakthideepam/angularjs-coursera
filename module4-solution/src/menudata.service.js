(function () {
  "use strict";

  angular
    .module("data")
    .constant(
      "categoriesUrl",
      "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json"
    )
    .constant(
      "menuItemsUrl",
      "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/"
    )
    .service("menudataService", MenuDataService);

  MenuDataService.$inject = ["$http", "categoriesUrl", "menuItemsUrl"];
  function MenuDataService($http, categoriesUrl, menuItemsUrl) {
    var service = this;

    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: categoriesUrl,
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error(error.data);
        });
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url: `${menuItemsUrl}${categoryShortName}.json`,
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error(error.data);
        });
    };
  }
})();
