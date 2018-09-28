angular.module('starter')
.controller('cargaMasivaCtrl', function($scope, $rootScope, $ionicPopup, $state, $http) {
	
	$scope.listaUsuarios = [];

	$scope.irAtras = function(){
		$scope.controlDisabled = true;
		$state.go("menu");
	};

	$scope.cargarUsuarios = function(){
		var fileUploaded = angular.element(document.querySelector('#fileUploaded'));
		
		if (fileUploaded[0].files.length == 0) {
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Debe seleccionar un archivo de excel con los usuarios'
			});
			return;
		}

		var validation = fileUploaded[0].files[0].name.split(".");

		if(validation[1]!="xls")
		{
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Debe seleccionar un archivo de tipo .xls'
			});
			return;
		}

		$scope.controlDisabled=true;
		
		var fd = new FormData();
		fd.append('file',fileUploaded[0].files[0]);

		$http.post($rootScope._host + 'users/cargaMasivaUsuarios',fd, {
			withCredentials : false,
			headers : {
				'Content-Type' : undefined
			},
			transformRequest : angular.identity
		})
		.success(function(data, status, headers, config) {
			if(data.state == 1){
				angular.element(document.querySelector('#fileUploaded'))[0].value="";
				$scope.controlDisabled=false;
				var alertPopup = $ionicPopup.alert({
					title: 'Exito',
					template: data.message
				});
			}else{
				$scope.controlDisabled=false;
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: data.message
				});
			}
		})
		.error(function(data){
			$scope.controlDisabled=false;
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: "Ocurrió un error inesperado, por favor intentelo más tarde o contacte al administrador del sistema"
			});
		});
	};
})