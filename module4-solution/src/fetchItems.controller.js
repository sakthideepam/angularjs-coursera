(function () {
  "use strict";

  angular
    .module("menuApp")
    .controller("fetchItemsController", FetchItemsController);

  FetchItemsController.$inject = ["oneCategory"];
  function FetchItemsController(oneCategory) {
    var $ctrl = this;
    $ctrl.oneCategory = oneCategory;
  }
})();
