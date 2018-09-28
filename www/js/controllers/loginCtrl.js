angular.module('starter')
.controller('loginCtrl', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService) {
    // Objeto de usuario.
    $scope.usuario = {};
    
    $scope.controlDisabled = false;

    $scope.init = function(){
        $scope.controlDisabled = false;
    };

    $scope.login=function(){
        $scope.controlDisabled = true;
        // Realizar petición de login
        $http.get($rootScope._host + 'users/login/' + $scope.usuario.user + '/' + $scope.usuario.pwd)
        .success(function(data) {
            $scope.controlDisabled = false;
            if(data.state == 1 && data.data.rol_id == 1){
                SharedService.userData = data.data;
                $state.go("menu");
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error al iniciar sesión',
                    template: 'Rol o Credenciales Inválidas'
                });
            }
        });
    };

    $scope.recuperarPass=function(){
        $scope.controlDisabled = false;
        $state.go("recuperarPass");
    }
})