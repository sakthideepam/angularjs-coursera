(function () {
  "use strict";

  angular
    .module("shoppingListApp", [])
    .controller("buyController", BuyController)
    .controller("boughtController", BoughtController)
    .service("shoppingList", shoppingListService);

  // Buy controller uses the shoppingList service to handle all buy list functionalities
  BuyController.$inject = ["shoppingList"];
  function BuyController(shoppingList) {
    var buyCtrl = this;
    buyCtrl.list = shoppingList.buyList;
    buyCtrl.buyItem = shoppingList.buyItem;
  }

  // Bought controller uses the shoppingList service to handle all bought list functionalities
  BoughtController.$inject = ["shoppingList"];
  function BoughtController(shoppingList) {
    var boughtCtrl = this;
    boughtCtrl.list = shoppingList.boughtList;
  }

  /* All the shopping list business logic are abstracted into the service */
  function shoppingListService() {
    var service = this;

    service.buyList = [
      {
        name: "Carrots",
        quantity: 5,
      },
      {
        name: "Tomatoes",
        quantity: 3,
      },
      {
        name: "Potatoes",
        quantity: 5,
      },
      {
        name: "Spinach Bag",
        quantity: 1,
      },
      {
        name: "Milk",
        quantity: 2,
      },
    ];

    service.boughtList = [];

    // function that checks of an item from the buy list
    // It basically moves the item from buy list to bought list
    service.buyItem = function (itemIndex) {
      let boughtItem = service.buyList.splice(itemIndex, 1);

      if (boughtItem.length == 0) {
        console.error("Cannot buy the item");
        return;
      }

      service.boughtList.push(boughtItem[0]);
    };
  }
})();
