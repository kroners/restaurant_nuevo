angular
	.module('app')
	.directive('ccSpinner', function () {
	return {
		'restrict': 'AE',
		'templateUrl': 'templates/spinner.html',
		'scope': {
			'isLoading':"=",
			'message':'@'
		}
	}
	})
	.directive('ccCard', function () {
		return {
			'restrict': 'AE',
			'templateUrl': 'templates/card.html',
			'scope': {
				'plato':'=',
				'editPlato':'&'
			},
			//the controller is directly related to the directive and it have its own scope var and you can inject anything
			'controller': function ($scope, $rootScope, $modal, DishService, OrdenService) {
				$scope.extra = OrdenService;
				$scope.isEditing = false;
				$scope.editPlatoModal = function () {
					console.log("personalizando plato con toppings");
					$scope.isEditing = true;
					$scope.selectedDish = $scope.plato;
					$scope.extra = OrdenService;
					$scope.createModal = $modal({
						scope: $scope,
						template: 'templates/modal.create.tpl.html',
						show: true
					})
					
				};
				$rootScope.$on('OrdenService:change', function(){
	            	$scope.createModal.hide();
	        	});
				// $scope.addTopping = function(top) {
				// 	$scope.extra.addToppingItem(top).then(function (data) {
				// 		if (data == true) {
				// 			$
				// 		}
				// 	})
				// }
			}
		}
	})
	.directive('cartSummary', function () {
		return {
			'restrict': 'AE',
			'templateUrl': 'templates/summary.html',
			'controller': function ($scope, OrdenService, UserService) {
				$scope.extra = OrdenService;
				$scope.users = UserService;
				console.log($scope.users.sessionUser);
			}
		}
	})
	.directive('cartCart', [function(){
        return {
            restrict : 'AE',
            scope: {},
            templateUrl: 'templates/orden.html',
            'controller': function ($scope, $state, OrdenService, UserService) {
            	console.log('carrito');
            	$scope.users = UserService;
				$scope.extra = OrdenService;
				console.log($scope.users.sessionUser);
            	$scope.hacerPedido = function () {
            		console.log('hacerPedido');
            		$scope.extra.savePedido();
            		$state.go('info');
            	}
            	console.log($scope.extra.pedidos);
    			console.log('after pedidos');
            }
        };
    }])

	;