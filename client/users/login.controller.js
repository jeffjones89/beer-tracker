(function(){
  angular
    .module("beerShare")
    .controller("loginController", [
      "$scope",
      '$state',
      'AuthService',
      function($scope, $state, AuthService){
      $scope.login = function(){
        $scope.error = false;
        $scope.disabled = true;

        //calling login
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)
          .then(function(){
            $state.go('beerIndex');
            $scope.disabled = false;
            $scope.loginForm= {};
          })

          //error
          .catch(function(){
            console.log($scope.loginForm);
            $scope.error = true;
             $scope.errorMessage = "Invalid username and/or password";
             $scope.disabled = false;
             $scope.loginForm = {};
          });
      };
      }
    ]);
}());
