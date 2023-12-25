(function () {
  "use strict";

  angular
    .module("narrowItDownApp", [])
    .controller("narrowItDownController", NarrowItDownController)
    .controller("foundItemsController", FoundItemsController)
    .service("menuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems)
    .constant(
      "menuItemsUrl",
      "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    );

  function FoundItems() {
    return {
      scope: {
        found: "<",
        onRemove: "&",
        emptySearchMsg: "<",
      },
      restrict: "E",
      templateUrl: "found-items.html",
      controller: "foundItemsController as foundCtrl",
      bindToController: true,
    };
  }

  function FoundItemsController() {
    var foundCtrl = this;
  }

  NarrowItDownController.$inject = ["menuSearchService"];
  function NarrowItDownController(menuSearchService) {
    var ctrl = this;
    ctrl.searchStr = "";
    ctrl.found = [];
    ctrl.emptySearchMsg = "";

    ctrl.filterMenuItems = function () {
      ctrl.found = [];
      if (ctrl.searchStr.length == 0) {
        setEmptySearchMsg();
        return;
      }

      resetEmptySearchMsg();
      var promise = menuSearchService.getMatchedMenuItems(ctrl.searchStr);

      promise
        .then(function (foundMenuItems) {
          ctrl.found = foundMenuItems;
          if (ctrl.found.length == 0) {
            setEmptySearchMsg();
          }
        })
        .catch(function (error) {
          console.log("Error occured while fetching menu items");
        });
    };

    ctrl.onRemove = function (itemIndex) {
      ctrl.found.splice(itemIndex, 1);
    };

    function setEmptySearchMsg() {
      ctrl.emptySearchMsg = "Nothing Found!";
    }

    function resetEmptySearchMsg() {
      ctrl.emptySearchMsg = "";
    }
  }

  MenuSearchService.$inject = ["$http", "menuItemsUrl"];
  function MenuSearchService($http, menuItemsUrl) {
    var searchService = this;

    searchService.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: menuItemsUrl,
      }).then(function (response) {
        var menuItems = response.data;
        var foundItems = [];

        for (var categName in menuItems) {
          var matchedItems = menuItems[categName].menu_items.filter((item) => {
            return item.description.indexOf(searchTerm) > -1;
          });
          foundItems.push(matchedItems);
        }

        return foundItems.flat();
      });
    };
  }
})();
