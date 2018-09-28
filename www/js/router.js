angular.module('starter')
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('cargaMasiva', {
    url: '/cargaMasiva',
    templateUrl: 'templates/cargaMasiva.html',
    controller: 'cargaMasivaCtrl'
  });

  $stateProvider
  .state('detallesPedido', {
    url: '/detallesPedido',
    templateUrl: 'templates/detallesPedido.html',
    controller: 'detallesPedidoCtrl'
  });

  $stateProvider
  .state('evaluacionServicios', {
    url: '/evaluacionServicios',
    templateUrl: 'templates/evaluacionServicios.html',
    controller: 'evaluacionServiciosCtrl'
  });

  $stateProvider
  .state('habeasData', {
    url: '/habeasData',
    templateUrl: 'templates/habeasData.html',
    controller: 'habeasDataCtrl'
  });

  $stateProvider
  .state('historialPedidos', {
    url: '/historialPedidos',
    templateUrl: 'templates/historialPedidos.html',
    controller: 'historialPedidosCtrl'
  });

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  });

  $stateProvider
  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  });

  $stateProvider
  .state('recuperarPass', {
    url: '/recuperarPass',
    templateUrl: 'templates/recuperarPass.html',
    controller: 'recuperarPassCtrl'
  });

  $stateProvider
  .state('registrarUsuario', {
    url: '/registrarUsuario',
    templateUrl: 'templates/registrarUsuario.html',
    controller: 'registrarUsuarioCtrl'
  });

  $stateProvider
  .state('registrarTarifas', {
    url: '/registrarTarifas',
    templateUrl: 'templates/registrarTarifas.html',
    controller: 'registrarTarifasCtrl'
  });

  $urlRouterProvider.otherwise('/login');
})