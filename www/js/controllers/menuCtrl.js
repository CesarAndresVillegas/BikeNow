angular.module('starter')
.controller('menuCtrl', function($scope, $rootScope, $ionicPopup, $state, $http) {
	$scope.controlDisabled = false;

    $scope.init = function(){
        $scope.controlDisabled = false;
    };

    $scope.registrarUsuario=function(){
        $scope.controlDisabled = true;
        $state.go("registrarUsuario");
    };

    $scope.historialPedidos=function(){
        $scope.controlDisabled = true;
        $state.go("historialPedidos");
    };

    $scope.irAtras=function(){
        $scope.controlDisabled = true;
        // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
            title: 'Salir de BikeNow',
            template: 'Desea salir de la aplicación?'
        });

        confirmPopup.then(function(res) {
           if(res) {
             $state.go("login")
         } else {
             $scope.controlDisabled = false;
         }
     });
    };

    $scope.registrarTarifas=function(){
       $state.go("registrarTarifas")
   };

   $scope.evaluacionServicios=function(){
       $state.go("evaluacionServicios")
   };

   $scope.cargaMasiva=function(){
       $state.go("cargaMasiva")
   };

   $scope.cargaHabeasData=function(){
       $state.go("habeasData")
   };
})