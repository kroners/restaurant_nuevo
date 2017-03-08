var app = angular.module('vegano', [
	'ngResource',
	'infinite-scroll',
	'angularSpinner',
	'jcs-autoValidate',
	'angular-ladda',
	'mgcrea.ngStrap',
	'toaster',
	'ngAnimate',
	'ui.router',
	'ngRoute',
	'ngCookies'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'main': {
					templateUrl: 'templates/home.html'
				}
			}
		})
		.state('listPlatos', {
			url: "/platos",
			views: {
				'main': {
					templateUrl: 'templates/listPlatos.html',
					controller: 'PlatosListController'
				},
				'search': {
					templateUrl: 'templates/searchform.html',
					controller: 'PlatosListController'
				}
			}
		})
		.state('edit', {
			url: "/edit/:email",
			views: {
				'main': {
					templateUrl: 'templates/edit.html',
					controller: 'PersonDetailController'
				}
			}
		})
		.state('create', {
			url: "/create",
			views: {
				'main': {
					templateUrl: 'templates/edit.html',
					controller: 'PersonCreateController'
				}
			}
		})
		.state('users', {
			url: '/users',
			views: {
				'main': {
					templateUrl: 'templates/list.html',
					controller: 'ListaUsuariosController'
				}
			}
		})
		.state('registrar', {
			url: '/registrar',
			views: {
				'main': {
					templateUrl: 'templates/edit.html',
					controller: 'RegistrarUsuarioController'
				}
			}
		})
		.state('login', {
			url: '/login',
			views: {
				'main': {
					templateUrl: 'templates/login.html',
					controller: 'RegistrarUsuarioController'
				}
			}
		});

	$urlRouterProvider.otherwise('/');
});

app.config(function ($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = 'Token 20002cd74d5ce124ae219e739e18956614aab490';
	$resourceProvider.defaults.stripTrailingSlashes = false;
	laddaProvider.setOption({
		style: 'expand-right'
	});
	angular.extend($datepickerProvider.defaults, {
		dateFormat: 'd/M/yyyy',
		autoclose: true
	});
});

app.filter('defaultImage', function () {
	return function (input, param) {
		if (!input) {
			return param
		}
		return input;
	}
});

// app.factory("Contact", function ($resource) {
// 	return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/", {id: '@id'}, {
// 		update: {
// 			method: 'PUT'
// 		}
// 	});
// });

app.factory("Contact", function () {
	console.log("dummy factory");
	var persons = [
		{
			"name": "Gregory Huffman",
			"email": "Praesent@pedenec.net",
			"birthdate": "2015-03-23T18:00:37-07:00",
			"sex": "male",
			"password": "greg1234",
			"phonenumber": "07624 073918",
			"address": "5880 Sed, Street",
			"city": "Denderbelle",
			"country": "Ethiopia",
			"role": 1
		},
		{
			"name": "Tabbytha Vazquez",
			"email": "dapibus.gravida@necimperdietnec.co.uk",
			"birthdate": "2015-12-28T06:02:56-08:00",
			"sex": "female",
			"password": "taby1234",
			"phonenumber": "(016977) 1036",
			"address": "830-6354 Cubilia Rd.",
			"city": "Sulzbach",
			"country": "Liechtenstein",
			"role": 9
		},
		{
			"name": "William Abbott",
			"email": "non.justo.Proin@mauris.net",
			"birthdate": "2015-07-30T09:00:15-07:00",
			"sex": "male",
			"password": "will1234",
			"phonenumber": "(01984) 57054",
			"address": "418-3595 Orci, St.",
			"city": "Lint",
			"country": "Sierra Leone",
			"role": 9
		}
		];
    return {
        get: function(){
            return persons;
        },
        find: function(index){
            return persons[index];
        }
    };
});

app.factory("Platos", function () {
	console.log("dummy factory dishes");
	var dishes = [
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		},
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		},
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		},
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		},
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		},
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		},
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		},
		{
			"name": "Ensalada de Pollo",
			"descripcion": "Rica ensalada de pollo",
			"precio": "14.5",
			"calorias": "250",
			"imagen": "http://www.recetaensaladas.net/ImagenesRecetaEnsaladas/ImagenesRecetaEnsaladas/receta-ensalada-pollo.jpg"
		}
		];
    return {
        get: function(){
            return dishes;
        },
        find: function(index){
            return dishes[index];
        }
    };
});

app.directive('ccSpinner', function () {
	return {
		'restrict': 'AE',
		'templateUrl': 'templates/spinner.html',
		'scope': {
			'isLoading':"=",
			'message':'@'
		}
	}
});

app.directive('ccCard', function () {
	return {
		'restrict': 'AE',
		'templateUrl': 'templates/card.html',
		'scope': {
			'plato':'=',
			'deletePlato':'&'
		},
		//the controller is directly related to the directive and it have its own scope var and you can inject anything
		'controller': function ($scope, DishService) {
			$scope.isDeleting = false;
			$scope.deletePlato = function () {
				console.log("delete me!")
				$scope.isDeleting = true;
				DishService.removeContact($scope.plato).then(function () {
					$scope.isDeleting = false;
				});
			};
		}
	}
});

app.controller('DetalleUsuarioController', function ($scope, $stateParams, $state, ContactService) {
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
});

app.controller('RegistrarUsuarioController', function ($scope, $state, ContactService) {
	$scope.mode = "Crear Usuario";

	$scope.users = ContactService;
	console.log('Creating a user');
	console.log($scope.users.persons);

	$scope.save = function () {
		console.log("createContact");
		$scope.users.persons.push($scope.users.incomingUser);
		$scope.users.incomingUser = {};
		// $scope.users.createContact($scope.users.incomingUser)
		// 	.then(function () {
		// 		$state.go("list");
		// 	})
	};

	// adding dome functions just to play with the crud
	$scope.delete = function (email) {
		for (i in $scope.users.persons) {
			if ($scope.users.persons[i].email == email) {
				$scope.users.persons.splice(i, 1);
				$scope.users.incomingUser = {};
			}
		}
	};

	$scope.edit = function (email) {
		for (i in $scope.users.persons) {
			if ($scope.users.persons[i].email == email) {
				$scope.users.incomingUser = angular.copy($scope.users.persons[i]);
			}
		}
	};
});

app.controller('PersonListController', function ($scope, $modal, ContactService) {

	$scope.search = "";
	$scope.order = "email";
	$scope.contacts = ContactService;

	$scope.loadMore = function () {
		console.log("Load More!!!");
		$scope.contacts.loadMore();
	};

	$scope.showCreateModal = function () {
		$scope.contacts.selectedPerson = {};
		$scope.createModal = $modal({
			scope: $scope,
			template: 'templates/modal.create.tpl.html',
			show: true
		})
	};
});

app.controller('PlatosListController', function ($scope, $modal, DishService) {

	$scope.search = "";
	$scope.order = "precio";
	$scope.dishes = DishService;
	console.log('listing dishes');
	console.log($scope.dishes.platos);

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
});

app.service('ContactService', function (Contact, $rootScope, $q, toaster) {


	var self = {
		'getPerson': function (email) {
			console.log(email);
			for (var i = 0; i < self.persons.length; i++) {
				var obj = self.persons[i];
				if (obj.email == email) {
					return obj;
				}

			}
		},
		'page': 1,
		'hasMore': true,
		'isLoading': false,
		'isSaving': false,
		'selectedPerson': null,
		'persons': [],
		'search': null,
		'ordering': 'name',
		'doSearch': function () {
			self.hasMore = true;
			self.page = 1;
			self.persons = [];
			self.loadContacts();
		},
		'doOrder': function () {
			self.hasMore = true;
			self.page = 1;
			self.persons = [];
			self.loadContacts();
		},
		'loadContacts': function () {
			if (self.hasMore && !self.isLoading) {
				self.isLoading = true;

				var params = {
					'page': self.page,
					'search': self.search,
					'ordering': self.ordering
				};
				console.log(params);
				//anything that is passed to the params will be query out
				// Contact.get(params, function (data) {
				// 	console.log('inside getting Contact data');
				// 	console.log(params);
				// 	console.log(data);
				// 	angular.forEach(data.results, function (person) {
				// 		self.persons.push(new Contact(person));
				// 	});

				// 	if (!data.next) {
				// 		self.hasMore = false;
				// 	}
				// 	//at the end we set it to false so it can be call again
				// 	self.isLoading = false;
				// });

				personas = Contact.get();
				console.log(personas);

					console.log('inside getting Contact data');
					console.log(params);
					console.log(personas);
					angular.forEach(personas, function (person) {
						self.persons.push(person);
					});

					if (personas) {
						self.hasMore = false;
					}
					//at the end we set it to false so it can be call again
					self.isLoading = false;
			}
		 	
		},
		'loadMore': function () {
			if (self.hasMore && !self.isLoading) {
				self.page += 1;
				self.loadContacts();
			}
		},
		'updateContact': function (person) {
			var d = $q.defer();
			self.isSaving = true;
			person.$update().then(function () {
				self.isSaving = false;
				toaster.pop('success', 'Updated ' + person.name);
				d.resolve()
			});
			return d.promise;
		},
		'removeContact': function (person) {
			var d = $q.defer();
			self.isDeleting = true;
			person.$remove().then(function () {
				self.isDeleting = false;
				var index = self.persons.indexOf(person);
				self.persons.splice(index, 1);
				self.selectedPerson = null;
				toaster.pop('success', 'Deleted ' + person.name);
				d.resolve()
			});
			return d.promise;
		},
		'createContact': function (person) {
			var d = $q.defer();
			self.isSaving = true;
			Contact.save(person).$promise.then(function () {
				self.isSaving = false;
				self.selectedPerson = null;
				self.hasMore = true;
				self.page = 1;
				self.persons = [];
				self.loadContacts();
				toaster.pop('success', 'Created ' + person.name);
				d.resolve()
			});
			return d.promise;
		},
		'watchFilters': function () {
			$rootScope.$watch(function () {
				return self.search;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doSearch();
				}
			});

			$rootScope.$watch(function () {
				return self.ordering;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doOrder();
				}
			});
		}

	};

	self.loadContacts();
	self.watchFilters();

	return self;
});

app.service('DishService', function (Platos, $rootScope, $q, toaster) {


	var self = {
		'getPlato': function (email) {
			console.log(email);
			for (var i = 0; i < self.platos.length; i++) {
				var obj = self.platos[i];
				if (obj.email == email) {
					return obj;
				}

			}
		},
		'page': 1,
		'hasMore': true,
		'isLoading': false,
		'isSaving': false,
		'selectedPerson': null,
		'platos': [],
		'search': null,
		'ordering': 'name',
		'doSearch': function () {
			self.hasMore = true;
			self.page = 1;
			self.platos = [];
			self.loadDishes();
		},
		'doOrder': function () {
			self.hasMore = true;
			self.page = 1;
			self.platos = [];
			self.loadDishes();
		},
		'loadDishes': function () {
			if (self.hasMore && !self.isLoading) {
				self.isLoading = true;

				var params = {
					'page': self.page,
					'search': self.search,
					'ordering': self.ordering
				};
				console.log(params);
				//anything that is passed to the params will be query out
				// Contact.get(params, function (data) {
				// 	console.log('inside getting Contact data');
				// 	console.log(params);
				// 	console.log(data);
				// 	angular.forEach(data.results, function (person) {
				// 		self.persons.push(new Contact(person));
				// 	});

				// 	if (!data.next) {
				// 		self.hasMore = false;
				// 	}
				// 	//at the end we set it to false so it can be call again
				// 	self.isLoading = false;
				// });

				platos = Platos.get();
				console.log(platos);

					console.log('inside getting Contact data');
					console.log(params);
					console.log(platos);
					angular.forEach(platos, function (plato) {
						self.platos.push(plato);
					});

					if (platos) {
						self.hasMore = false;
					}
					//at the end we set it to false so it can be call again
					self.isLoading = false;
			}
		 	
		},
		'loadMore': function () {
			if (self.hasMore && !self.isLoading) {
				self.page += 1;
				self.loadDishes();
			}
		},
		'updateContact': function (person) {
			var d = $q.defer();
			self.isSaving = true;
			person.$update().then(function () {
				self.isSaving = false;
				toaster.pop('success', 'Updated ' + person.name);
				d.resolve()
			});
			return d.promise;
		},
		'removeContact': function (person) {
			var d = $q.defer();
			self.isDeleting = true;
			person.$remove().then(function () {
				self.isDeleting = false;
				var index = self.platos.indexOf(person);
				self.platos.splice(index, 1);
				self.selectedPerson = null;
				toaster.pop('success', 'Deleted ' + person.name);
				d.resolve()
			});
			return d.promise;
		},
		'createContact': function (person) {
			var d = $q.defer();
			self.isSaving = true;
			Contact.save(person).$promise.then(function () {
				self.isSaving = false;
				self.selectedPerson = null;
				self.hasMore = true;
				self.page = 1;
				self.platos = [];
				self.loadDishes();
				toaster.pop('success', 'Created ' + person.name);
				d.resolve()
			});
			return d.promise;
		},
		'watchFilters': function () {
			$rootScope.$watch(function () {
				return self.search;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doSearch();
				}
			});

			$rootScope.$watch(function () {
				return self.ordering;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doOrder();
				}
			});
		}

	};

	self.loadDishes();
	self.watchFilters();

	return self;
});