(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.lunchOptions = "";
    $scope.lunchOptionMessage = "";
    $scope.fontColor = "black";
    $scope.borderColor = "";

    $scope.checkLunchOptions = function () {
      // Split the lunch options and remove empty values
      var options = $scope.lunchOptions
        .split(",")
        .filter((option) => option.trim().length > 0);

      console.log(options);

      if (options.length == 0) {
        $scope.lunchOptionMessage = "Please enter data first";
        $scope.fontColor = "red";
        $scope.borderColor = "red";
        return;
      }

      $scope.fontColor = "green";
      $scope.borderColor = "green";

      if (options.length <= 3) {
        $scope.lunchOptionMessage = "Enjoy!";
        return;
      }

      $scope.lunchOptionMessage = "Too much!";
    };
  }
})();
