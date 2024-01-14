(function () {
  "use strict";

  angular.module("public").component("favoriteDish", {
    bindings: {
      title: "<",
      desc: "<",
      shortName: "<",
      categoryShortName: "<",
    },
    templateUrl: "src/public/my-info/favorite-dish/favorite-dish.html",
  });
})();
