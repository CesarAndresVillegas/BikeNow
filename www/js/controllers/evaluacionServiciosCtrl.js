angular.module('starter')
    .controller('evaluacionServiciosCtrl', function($scope, $rootScope, $ionicPopup, $state, $http, SharedService) {
        $scope.historialLista = [];
        $scope.consulta = {};

        $scope.irAtras = function() {
            $state.go("menu")
        };

        $scope.verDetalles = function() {
            SharedService.objSeleccioado = $scope.historialLista[index];
            $state.go("detallesPedido");
        };

        $scope.consultarOrdenes = function() {
            if (!$scope.consulta.monthInit) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Seleccione el mes inicial'
                });
                return;
            }

            if (!$scope.consulta.monthFin) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Seleccione el mes final'
                });
                return;
            }

            if (!$scope.consulta.dayInit) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Seleccione el dia inicial'
                });
                return;
            }

            if (!$scope.consulta.dayFin) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Seleccione el dia final'
                });
                return;
            }

            if (!$scope.consulta.yearInit) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Seleccione el año inicial'
                });
                return;
            }

            if (!$scope.consulta.yearFin) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Seleccione el año final'
                });
                return;
            }

            var fechaInicio = $scope.consulta.yearInit + "-" + $scope.consulta.monthInit + "-" + $scope.consulta.dayInit;
            var fechaFinal = $scope.consulta.yearFin + "-" + $scope.consulta.monthFin + "-" + $scope.consulta.dayFin;

            console.log(fechaInicio);
            console.log(fechaFinal);

            // Consultar
            $http.get($rootScope._host + 'orders/reportOrders/' + fechaInicio + '/' + fechaFinal)
                .success(function(data) {
                    if (data.state == "1") {
                        $scope.historialLista = data.data;
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Generar Excel',
                            template: 'Desea generar un archivo de excel con la informacion?'
                        });
                        confirmPopup.then(function(res) {
                            if (res) {
                                $scope.exportData();
                            }
                        })
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: data.message
                        });
                    }
                });
        };

        $scope.exportData = function() {
            alasql("SELECT * INTO XLSX('historial_evaluaciones.xlsx',{headers:true}) FROM ? ", [$scope.historialLista]);
        };
    })
