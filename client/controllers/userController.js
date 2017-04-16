(function() {
    'use strict';

angular
    .module('app')
    .controller('RegistrarUsuarioController', function ($scope, $rootScope, $state, UserService, OrdenService) {
		$scope.mode = "Ingresa tus datos";

		$scope.users = UserService;
		$scope.extra = OrdenService;
		console.log('Creating a user');
		console.log($scope.users.sessionUser);

		$scope.save = function () {
			console.log("createUser");
			$scope.users.createUser($scope.users.incomingUser)
				.then(function () {
					console.log($scope.users.sessionUser);
					if ($scope.users.sessionUser){
						$scope.usuario = $scope.users.sessionUser
						$state.go("listPlatos");
					} else {
						$state.go("home");
					}
				})
		};
	})

    .controller('LoginUsuarioController', function ($scope, $rootScope, $state, UserService, OrdenService) {
		$scope.mode = "Login Usuario";

		$scope.users = UserService;
		$scope.extra = OrdenService;

		console.log('Logging user');
		console.log($scope.users.sessionUser);
		console.log($scope.users.logged);
		$scope.login = function () {
			console.log("logUser");
			$scope.users.loginUser($scope.users.loggingUser)
				.then(function () {
					console.log($scope.users.sessionUser);
					if ($scope.users.sessionUser){
						$scope.usuario = $scope.users.sessionUser
						$state.go("listPlatos");
					} else {
						$state.go("home");
					}
				})
		};

		$scope.logout = function () {
			console.log('logging out');
			$scope.users.logoutUser();
			$state.go('home');
		};
	})

	.controller('HomeController', function ($scope, $state, UserService, OrdenService) {
		$scope.mode = "Home";

		$scope.users = UserService;
		$scope.extra = OrdenService;

		console.log($scope.users.sessionUser);
		if (!$scope.users.sessionUser){
			$scope.usuario = $scope.user.sessionUser;
		}

		$scope.logout = function () {
			console.log('logging out');
			$scope.users.logoutUser();
			$state.go('home');
		};
	})

    .controller('DetalleUsuarioController', function ($scope, $stateParams, $state, ContactService) {
		$scope.mode = "Edit";

		$scope.contacts = ContactService;
		$scope.contacts.selectedPerson = $scope.contacts.getPerson($stateParams.email);


		$scope.save = function () {
			$scope.contacts.updateContact($scope.contacts.selectedPerson).then(function () {
				$state.go("list");
			});

		};

		$scope.remove = function () {
			$scope.contacts.removeContact($scope.contacts.selectedPerson).then(function () {
				$state.go("list");
			});
		}
	})

    .controller('ProfileController', function ($scope, $rootScope, UserService) {
    	$scope.mode = "Perfil";

    	
    });
})();