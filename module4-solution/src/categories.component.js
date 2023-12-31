(function () {
  "use strict";

  angular.module("menuApp").component("categories", {
    templateUrl: "src/categories.template.html",
    bindings: {
      categoryItems: "<",
    },
  });
})();
