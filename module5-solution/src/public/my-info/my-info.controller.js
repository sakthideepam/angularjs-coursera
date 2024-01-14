(function () {
  "use strict";

  angular.module("public").controller("myInfoController", MyInfoController);

  MyInfoController.$inject = ["signUpService"];
  function MyInfoController(signUpService) {
    var $ctrl = this;

    if (signUpService.didUserSignUp()) {
      $ctrl.signedUpData = signUpService.getSignedUpData();
      getFavoriteDishDetails();
    }

    function getFavoriteDishDetails() {
      const shortNames = signUpService.getAllShortNames();
      $ctrl.favoriteDishDetails = shortNames[$ctrl.signedUpData.favoriteDish];
    }
  }
})();
