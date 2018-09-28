angular.module('starter')
.controller('recuperarPassCtrl', function($scope, $rootScope, $ionicPopup, $state, $http) {
	$scope.controlDisabled = false;

	$scope.init = function(){
    	$scope.controlDisabled = false;
  	};

    $scope.irAtras=function(){
        $scope.controlDisabled = true;
        $state.go("login")
    };
})