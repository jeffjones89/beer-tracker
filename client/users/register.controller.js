(function(){
  angular
    .module('beerShare')
    .controller('registerController', [
      '$scope',
      '$state',
      'AuthService',
      function($scope, $state, AuthService){
        console.log(AuthService.getUserStatus());

        $scope.register = function(){
          $scope.error = false;
          $scope.disabled = true;

          //register from AS

          AuthService.register($scope.registerForm.username, $scope.registerForm.password)
            .then(function (){
              $state.go('login');
              $scope.disabled = false;
              $scope.registerForm = {};
            })
            .catch(function(){
              $scope.error = true;
              $scope.errorMessage = "Unable to Register this Account, please try again!";
              $scope.disabled = false;
              $scope.registerForm = {};
            });
        };
      }
    ]);
}());
