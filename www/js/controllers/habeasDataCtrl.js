angular.module('starter')
.controller('habeasDataCtrl', function($scope, $rootScope, $ionicPopup, $state, $http) {
	
	$scope.listaTerms = [];

	$scope.init = function(){
		$scope.controlDisabled = false;
		$scope.termsLoad();
	};

	$scope.termsLoad = function() {
		$http.get($rootScope._host + 'terms/getAll')
		.success(function(data){
			if(data.state == "1"){
				$scope.listaTerms = data.data;
			}
		});
	};

	$scope.irAtras = function(){
		$scope.controlDisabled = true;
		$state.go("menu");
	};

	$scope.cargarPdf = function(){
		var fileUploaded = angular.element(document.querySelector('#fileUploaded'));
		
		if (fileUploaded[0].files.length == 0) {
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Debe seleccionar un archivo de pdf con los terminos y condiciones'
			});
			return;
		}

		var validation = fileUploaded[0].files[0].name.split(".");

		if(validation[1]!="pdf")
		{
			var alertPopup = $ionicPopup.alert({
				title: 'Error',
				template: 'Debe seleccionar un archivo de tipo .pdf'
			});
			return;
		}

		$scope.controlDisabled=true;
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Cargar PDF',
			template: 'Desea actualizar los terminos y condiciones?. Tenga en cuenta que actualizará los términos actuales (serán los últimos actuales)'
		});

		confirmPopup.then(function(res) {
			if(res) {
				$rootScope.show();

				var fileName = {
					name: validation[0]
				};

				var fd = new FormData();
				fd.append('file',fileUploaded[0].files[0]);
				fd.append("data", JSON.stringify(fileName));

				$http.post($rootScope._host + 'terms/create',fd, {
					withCredentials : false,
					headers : {
						'Content-Type' : undefined
					},
					transformRequest : angular.identity
				})
				.success(function(data, status, headers, config) {
					$rootScope.hide();
					if(data.state == 1){
						angular.element(document.querySelector('#fileUploaded'))[0].value="";
						$scope.controlDisabled=false;
						var alertPopup = $ionicPopup.alert({
							title: 'Exito',
							template: data.message
						});
						$scope.termsLoad();
					}else{
						$scope.controlDisabled=false;
						var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: data.message
						});
					}
				})
				.error(function(data){
					$rootScope.hide();
					$scope.controlDisabled=false;
					var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: "Ocurrió un error inesperado, por favor intentelo más tarde o contacte al administrador del sistema"
					});
				});
			};
		});
	};

	$scope.gridClick = function($index) {
		window.open($scope.listaTerms[$index].url, '_blank', 'location=no');
	}
})