(function() {
    'use strict';

angular
	.module('app')
	.controller('PlatosListController', function ($scope, $modal, DishService, OrdenService, UserService) {

	$scope.search = "";
	$scope.order = "precio";
	$scope.dishes = DishService;
	$scope.users = UserService;
	$scope.pedido = OrdenService;
	
	console.log($scope.users.sessionUser);
	console.log($scope.users.logged);
	console.log('listing dishes');
	console.log($scope.dishes.platos);
	console.log($scope.dishes);

	$scope.loadMore = function () {
		console.log("Load More!!!");
		$scope.dishes.loadMore();
	};

	$scope.showCreateModal = function () {
		$scope.dishes.selectedDish = {};
		$scope.createModal = $modal({
			scope: $scope,
			template: 'templates/modal.create.tpl.html',
			show: true
		})
	};
	console.log($scope.dishes.platos);

});

})();