(function () {
  "use strict";

  angular.module("public").service("signUpService", SignUpService);

  SignUpService.$inject = ["$http", "ApiPath"];
  function SignUpService($http, ApiPath) {
    var service = this;
    service.signedUpData = {};
    service.allShortNames = {};

    service.saveSignedUpData = function (signedUpDetails) {
      service.signedUpData = signedUpDetails;
    };

    service.getSignedUpData = function () {
      return service.signedUpData;
    };

    service.didUserSignUp = function () {
      return Object.entries(service.signedUpData).length > 0;
    };

    service.getAllMenuItems = function () {
      return $http.get(ApiPath + "/menu_items.json").then(function (response) {
        retrieveShortNames(response.data);
        return service.allShortNames;
      });
    };

    service.getAllShortNames = function () {
      return service.allShortNames;
    };

    function retrieveShortNames(allMenuItems) {
      console.log(allMenuItems);
      for (const [key, value] of Object.entries(allMenuItems)) {
        getShortNames(value.menu_items, key);
      }
      console.log(service.allShortNames);
    }

    function getShortNames(menuItems, categoryShortName) {
      menuItems.map((itemObj) => {
        const item = {
          title: itemObj.name,
          desc: itemObj.description,
          categoryShortName,
        };
        service.allShortNames[itemObj.short_name] = item;
      });
    }
  }
})();
