(function () {
  "use strict";

  angular.module("public").controller("signUpController", SignUpController);

  SignUpController.$inject = ["signUpService", "allShortNames"];
  function SignUpController(signUpService, allShortNames) {
    var $ctrl = this;
    $ctrl.userData = {};
    $ctrl.committedData = false;
    $ctrl.allShortNames = allShortNames;
    // retrieveShortNames();

    $ctrl.onSubmit = function () {
      console.log($ctrl.userData);

      $ctrl.committedData = $ctrl.isFavoriteDishValid();
      if (!$ctrl.committedData) {
        return;
      }

      signUpService.saveSignedUpData($ctrl.userData);
      $ctrl.committedData = true;

      console.log(signUpService.getSignedUpData());
    };

    $ctrl.isFavoriteDishValid = function () {
      if (!$ctrl.userData.favoriteDish) {
        return false;
      }

      $ctrl.userData.favoriteDish = $ctrl.userData.favoriteDish.toUpperCase();
      if ($ctrl.allShortNames[$ctrl.userData.favoriteDish] == undefined) {
        document
          .querySelector('.sign-up-form-entry input[name="favoriteDish"]')
          .classList.add("field-invalid");
      } else {
        document
          .querySelector('.sign-up-form-entry input[name="favoriteDish"]')
          .classList.remove("field-invalid");
      }

      return $ctrl.allShortNames[$ctrl.userData.favoriteDish] != undefined;
    };
  }
})();
