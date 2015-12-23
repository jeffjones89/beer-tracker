(function(){
  angular
    .module("beerShare")
    .controller("BeerIndexController", [
      "BeerFactory",
      BeerIndexControllerFunction
    ]);
    
    function BeerIndexControllerFunction(BeerFactory){
      this.beers = BeerFactory.query();
      this.test = "Hello!"
    }
}());
