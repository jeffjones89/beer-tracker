(function(){
  angular
    .module("beerShare")
    .controller("logoutController", [
      '$scope',
      '$state',
      'AuthService',
      function($scope, $state, AuthService){
        $scope.logout = function(){
          console.log(AuthService.getUserStatus());
          AuthService.logout()
            .then(function () {
              $state.go('login');
            });
        };
      }
    ]);
}());
