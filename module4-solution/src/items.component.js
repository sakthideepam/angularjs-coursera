(function () {
  "use strict";

  angular.module("menuApp").component("items", {
    templateUrl: "src/items.template.html",
    bindings: {
      itemList: "<",
    },
  });
})();
