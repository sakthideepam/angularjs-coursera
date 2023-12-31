(function () {
  "use strict";

  angular.module("menuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Set the default state
    $urlRouterProvider.otherwise("/");

    $stateProvider
      // State 1: home (default state)
      .state("home", {
        url: "/",
        templateUrl: "src/home.template.html",
      })
      /* State 2: categories
       * makes the ajax call to get list of categories in resolve
          and pass that as categoryItems
       */
      .state("categories", {
        url: "/categories",
        templateUrl: "src/fetchCategories.template.html",
        controller: "fetchCategoriesController as $ctrl",
        resolve: {
          categoryItems: [
            "menudataService",
            function (menudataService) {
              return menudataService.getAllCategories();
            },
          ],
        },
      })
      /* State 3: items
       * makes the ajax call using the short_name passed in as state param
         in resolve and pass that as oneCategory into the controller
       */
      .state("items", {
        url: "/items/{itemShortName}",
        templateUrl: "src/fetchItems.template.html",
        controller: "fetchItemsController as $ctrl",
        resolve: {
          oneCategory: [
            "$stateParams",
            "menudataService",
            function ($stateParams, menudataService) {
              return menudataService.getItemsForCategory(
                $stateParams.itemShortName
              );
            },
          ],
        },
      })
      /* Nested view: items.details
       * Gets the clicked item's description from the parent view and pass that
         as itemDesc to the child view
       */
      .state("items.details", {
        template: `<div class="item-desc">{{$ctrl.description}}</div>`,
        params: {
          itemDesc: null,
        },
        controller: "itemDetailController as $ctrl",
      });
  }
})();
