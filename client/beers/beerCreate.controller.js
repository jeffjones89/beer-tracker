(function(){
  angular
    .module("beerShare")
    .controller("BeerCreateController", [
      "BeerFactory",
      BeerCreateControllerFunction
    ]);

    function BeerCreateControllerFunction(BeerFactory){
      
    }
}());
