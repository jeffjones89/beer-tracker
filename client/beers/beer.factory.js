(function(){
    angular.module("beerShare")
    .factory("BeerFactory",[
      "$resource",
      BeerFactoryFunction
    ]);

    function BeerFactoryFunction($resource){
      return $resource("/api/beers/:id");
    }
}());
