(function () {
  "use strict";

  angular
    .module("menuApp")
    .controller("fetchCategoriesController", FetchCategoriesController);

  FetchCategoriesController.$inject = ["categoryItems"];
  function FetchCategoriesController(categoryItems) {
    var $ctrl = this;
    $ctrl.categoryItems = categoryItems;
  }
})();
