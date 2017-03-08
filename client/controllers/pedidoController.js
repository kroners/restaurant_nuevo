(function() {
    'use strict';

angular
    .module('app')
    .controller('PedidoController', function ($scope, $rootScope, $state, OrdenService, UserService, PedidosService) {
	
	$scope.extra = OrdenService;
    $scope.users = UserService;
    $scope.lista = PedidosService;
    console.log($scope.users.sessionUser.nombre);
    console.log($scope.users.logged);
	console.log('PedidoController');

    if ($scope.users.sessionUser) {
        console.log('in');
        $scope.extra.incomingDato = $scope.users.sessionUser;
        console.log($scope.extra.incomingDato);
    };

    $scope.ingresarDatos = function () {
    	$scope.extra.terminarPedido($scope.extra.incomingDato).then(function (){
    		$state.go('home');
    	});
    }

    $scope.listar = function () {
        $scope.lista.getPedidos();
    }
    console.log($scope.extra.pedidos);
    console.log('after pedidos');

});
})();