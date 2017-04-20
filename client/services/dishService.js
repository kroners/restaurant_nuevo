angular
	.module('app')
	.service('DishService', function (Platos, Plato, $rootScope, $q, toaster) {

	var self = {
		'getPlato': function (id) {
			console.log(id);
			for (var i = 0; i < self.platos.length; i++) {
				var obj = self.platos[i];
				if (obj.id == id) {
					return obj;
				}

			}
		},
		'page': 2,
		'hasMore': true,
		'isLoading': false,
		'isSaving': false,
		'selectedDish': null,
		'platos': [],
		'search': null,
		'ordering': 'precio',
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
				// anything that is passed to the params will be query out
				// Platos.get(params, function (data) {
				// 	console.log('inside getting Platos data');
				// 	console.log(params);
				// 	console.log(data);
				// 	console.log(data.platos);
				// 	angular.forEach(data.platos, function (plato) {
				// 		self.platos.push(plato);
				// 	});
				// 	console.log(self.platos);
				// 	if (!data.next) {
				// 		self.hasMore = false;
				// 	}
				// 	//at the end we set it to false so it can be call again
				// 	self.isLoading = false;
				// });

				platos = Platos.get();
				platos.$promise.then(function (data) {
					console.log('using promise with data');
					console.log(data.platos);
					console.log('inside getting Dish data');
					angular.forEach(data.platos, function (plato) {
						console.log(plato);
						self.platos.push(new Plato(plato));
					});
					console.log(self.platos);
					if (!data.next) {
						self.hasMore = false;
					}
					//at the end we set it to false so it can be call again
					self.isLoading = false;
				});

				var lista = Promise.resolve(self.platos);
				lista.then(function (v) {
					console.log(v);
				});
			}
		 	
		},
		'loadMore': function () {
			if (self.hasMore && !self.isLoading) {
				self.page += 1;
				self.loadDishes();
			}
		},
		'updateDish': function (plato) {
			var d = $q.defer();
			self.isSaving = true;
			plato.$update().then(function () {
				self.isSaving = false;
				toaster.pop('success', 'Updated ' + plato.nombre);
				d.resolve()
			});
			return d.promise;
		},
		'removeContact': function (plato) {
			var d = $q.defer();
			self.isDeleting = true;
			plato.$remove().then(function () {
				self.isDeleting = false;
				var index = self.platos.indexOf(plato);
				self.platos.splice(index, 1);
				self.selectedDish = null;
				toaster.pop('success', 'Deleted ' + plato.nombre);
				d.resolve()
			});
			return d.promise;
		},
		'createContact': function (plato) {
			var d = $q.defer();
			self.isSaving = true;
			Contact.save(plato).$promise.then(function () {
				self.isSaving = false;
				self.selectedDish = null;
				self.hasMore = true;
				self.page = 1;
				self.platos = [];
				self.loadDishes();
				toaster.pop('success', 'Created ' + plato.nombre);
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