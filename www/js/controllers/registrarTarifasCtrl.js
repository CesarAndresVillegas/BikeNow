angular.module('starter')
.controller('registrarTarifasCtrl', function($scope, $rootScope, $ionicPopup, $state, $http) {
	$scope.tarifaSeleccionada = {};
	$scope.listaTarifas = [];
	$scope.tarifa = {};

	$scope.controlDisabled = false;

	$scope.init = function(){
		$scope.cargarTarifas();
	};

	$scope.tratarTarifa = function(){
		var datosTarifa = {
			name: $scope.tarifa.name,
			cost: $scope.tarifa.cost,
			active: $scope.tarifa.active,
			return_cost: $scope.tarifa.return
		};

		var flag = false;

		for (var i = 0; i < $scope.listaTarifas.length; i++) {
			if(datosTarifa.name == $scope.listaTarifas[i].name)
			{
				flag = true;
				$scope.updateTarifa(datosTarifa);
				break;
			}
		}

		if (!flag) {
			$scope.createTarifa(datosTarifa);
		}
	};

	$scope.updateTarifa=function(datosTarifa){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Modificar Tarifa',
			template: 'El nombre de tarifa ya existe, desea modificar?'
		});

		confirmPopup.then(function(res) {
			if(res) {
				$scope.controlDisabled=true;
				// Enviar orden.
				$http({
					url: $rootScope._host + 'orders/createTypeOrder',
					method: "POST",
					data: datosTarifa
				})
				.success(function(data, status, headers, config) {
					$scope.controlDisabled = false;
					if(data.state == 1){
						$scope.tarifa={};
						var alertPopup = $ionicPopup.alert({
							title: 'Exito',
							template: data.message
						});
						$scope.cargarTarifas();
					}else{
						var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: data.message
						});
					}
				})
				.error(function(data){
					$scope.controlDisabled = false;
				});
			}
		});
	};

	$scope.createTarifa=function(datosTarifa){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Almacenar Tarifa',
			template: 'El nombre de tarifa no existe, desea crear la nueva tarifa?'
		});

		confirmPopup.then(function(res) {
			if(res) {
				$scope.controlDisabled=true;
				// Enviar orden.
				$http({
					url: $rootScope._host + 'orders/createTypeOrder',
					method: "POST",
					data: datosTarifa
				})
				.success(function(data, status, headers, config) {
					$scope.controlDisabled = false;
					if(data.state == 1){
						$scope.tarifa={};
						var alertPopup = $ionicPopup.alert({
							title: 'Exito',
							template: data.message
						});

						$scope.cargarTarifas();
					}else{
						var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: data.message
						});
					}
				})
				.error(function(data){
					$scope.controlDisabled = false;
				});
			}
		});
	};

	$scope.irAtras = function(){
		$state.go("menu");
	};

	$scope.gridClick = function(index){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Ver datos de tarifa',
			template: 'Desea visualizar los datos de la tarifa seleccionada?'
		});

		confirmPopup.then(function(res) {
			if (res) {
				$scope.tarifa.name = $scope.listaTarifas[index].name;
				$scope.tarifa.cost = Number($scope.listaTarifas[index].cost);
				$scope.tarifa.active = $scope.listaTarifas[index].active=='1' ? true:false;
				$scope.tarifa.return = Number($scope.listaTarifas[index].return_cost);
			}
		});
	};

	$scope.cargarTarifas = function(){
		$http.get($rootScope._host + 'orders/all_orders_type')
		.success(function(data){
			if(data.state == "1"){
				$scope.listaTarifas = data.data;
			}
		});
	};
})