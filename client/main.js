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
    .state("newBeer", {
      url:"/beers/new",
      templateUrl:"beers/create.html",
      controller:"BeerCreateController",
      controllerAs: "newBeerCtrl"
    })
    .state("login", {
      url:"/login",
      templateUrl:"/users/login.html",
      controller: "loginController",
      controllerAs: "LoginCtrl"
    })
    .state("logout", {
      url:"/logout",
      controller: "logoutController",
      controllerAs: "logoutCtrl"
    })
    .state("register", {
      url:"/register",
      templateUrl: "/users/register.html",
      controller: "registerController"
    });
  }

})();
