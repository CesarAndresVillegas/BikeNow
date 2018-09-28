angular.module('starter')
.controller('detallesPedidoCtrl', function($scope, $rootScope, $ionicPopup, $state, $http, $ionicActionSheet, $timeout, SharedService) {
	$scope.trayectos = [];
	$scope.observations = "";
  $scope.detalles_pedido=[];
  $scope.pedidoSeleccionado;

  $scope.objHistorialSeleccionado = {};

  $scope.init = function(){
    $scope.pedidoSeleccionado = SharedService.objSeleccioado;
    $scope.obtenerDetalles();
  };

  $scope.irAtras = function(){
    $state.go("historialPedidos");
  };

  $scope.obtenerDetalles = function(){
    $http.get($rootScope._host + 'delivery/detalles_pedido/' + $scope.pedidoSeleccionado.id)
    .success(function(data){
      if(data.state == "1"){
        $scope.detalles_pedido = data.data;
      }
    });
  };
})