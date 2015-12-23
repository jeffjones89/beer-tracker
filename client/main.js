"use strict";
(function() {
  angular.module('beerShare', [
    'ui.router',
    'ui.bootstrap',
    'ngResource'
  ])
  .config([
    "$stateProvider",
    Router
  ]);

  function Router($stateProvider){
    $stateProvider
    .state("beerIndex",{
      url:"/beers",
      templateUrl: "/beers/index.html",
      controller: "BeerIndexController",
      controllerAs: "BeerIndexViewModel"
    })
    .state("login", {
      url:"/login",
      templateUrl:"/users/login.html",
      controller: "loginController",
      controllerAs: "LoginCtrl"
    });
  }
})();
