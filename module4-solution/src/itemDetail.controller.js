(function () {
  "use strict";

  angular
    .module("menuApp")
    .controller("itemDetailController", ItemDetailController);

  ItemDetailController.$inject = ["$stateParams"];
  function ItemDetailController($stateParams) {
    var $ctrl = this;
    $ctrl.description = $stateParams.itemDesc;
  }
})();
