angular
	.module('app')
	.service('OrdenService', function (Topping, Plato, Pedido, Pedidos, $rootScope, $q, toaster) {

	var self = {
		'init': function () {
            this.$cart = {
                shipping : null,
                taxRate : null,
                tax : null,
                items : []
            };
        },
		'getPlato': function (id) {
			console.log(id);
			for (var i = 0; i < self.toppings.length; i++) {
				var obj = self.toppings[i];
				if (obj.id == id) {
					return obj;
				}

			}
		},
		'page': 1,
		'hasMore': true,
		'isLoading': false,
		'isSaving': false,
		'selectedDish': null,
		'toppings': [], // listado de toppings de bds
		'threeToppings': [], 
		'orden': [],
		'items': [], // listado de pedidos
		'search': null,
		'pedidos': [],
		'ordering': 'precio',
		'savePedido': function () {
			self.orden.push(self.items);
		},
		'terminarPedido': function (data) {

			console.log(data);
			console.log("TEEERRMINMAAAAAAANDOOOOO");
			console.log(self.orden);
			console.log(data.usuario);
			console.log(data.usuario._id);
			self.getOrden();
			console.log(self.orden.orden);
			var body = {
				"usuarioId": data.usuario._id,
				"nombre": data.nombre,
				"telefono": data.telefono,
				"direccion": data.direccion,
				"modalidad_pago": "Efectivo",
				"precio": self.totalCost(),
				"orden": self.orden.orden
			};

			console.log(body);
			var d = $q.defer();
			self.isSaving = true;

			Pedido.save(body).$promise.then(function (data) {
				self.isSaving = false;
				self.selectedDish = null;
				self.items = [];
				self.orden = [];
				self.threeToppings = [];
				self.loadToppings();
				toaster.pop('success', 'Pedido Creado');
				d.resolve()
			});
			$rootScope.$broadcast('OrdenService:change', {});
			return d.promise;
		},
		'getOrden': function() {
			var orden = self.orden;
			self.orden = [];
			var oneD = {};
			var allarray = [];
			angular.forEach(orden[0], function(dish){
				console.log(dish);
				oneD = {'plato': dish.plato._id, 'cantidad': dish.cantidad, 'toppings':self.getToppingsDish(dish)};
				allarray.push(oneD);
			});
			console.log(typeof allarray);
			var arrayOrden = $.map(allarray, function(value, index){
				return [value];
			})
			var arrrr = Array.from(arrayOrden);
			console.log(arrrr, typeof arrrr);
			if (Array.isArray(arrrr)) {
				console.log(true);
			}
			console.log(arrayOrden, typeof arrayOrden);
			self.orden.orden = arrrr;
		},
		'getToppingsDish': function (dish) {
			var oneT = {};
			var allarray = [];
			console.log(dish);
			if (dish.toppings.length) {
				angular.forEach(dish.toppings, function(item){
					console.log(item);
					oneT = {'topping': item._id, 'cantidad': item.cantidad};
					allarray.push(oneT);
				});
				console.log(typeof allarray);
				var arrayOrden = $.map(allarray, function(value, index){
					return [value];
				})
				var arrrr = Array.from(arrayOrden);
				console.log(arrrr, typeof arrrr);
				if (Array.isArray(arrrr)) {
					console.log(true);
				}
				console.log(arrayOrden, typeof arrayOrden);
				return arrrr;
			} else {
				var arrrr = Array.from(arrayOrden);
				console.log(arrrr, typeof arrrr);
				if (Array.isArray(arrrr)) {
					console.log(true);
				}
				console.log(arrayOrden, typeof arrayOrden);
				return arrrr;
			}
			
		},
		'addToppingItem' : function (top) {
			// console.log(top);
			// var toppingInCart = self.getToppingInCart(top.id);
			// console.log('printing threeToppings');
			// console.log(self.threeToppings.length);
			if (self.threeToppings.length > 2) {
				console.log("You already have three toppings");
				console.log(self.threeToppings);
			} else {
				self.threeToppings.push(top);
			}
		},
		'addPlatoCart': function (plato) {
			// console.log(plato);
			var inCart = self.getItemById(plato._id);
			// console.log(typeof inCart);

			if (typeof inCart === 'object'){
                //Update quantity of an item if it's already in the cart
                // inCart.setQuantity(plato.quantity, false);
                // console.log(inCart);
                if (!inCart.toppings.length && !self.threeToppings.length) {
                	inCart.cantidad += 1;
                } else {
                	var newDish = new Plato(plato._id, plato.nombre, plato.precio);
	            	var newDish2 = {'id': plato._id, 'nombre': plato.nombre, 'precio': plato.precio}
	                if (self.threeToppings.length) {
	            		var newItem = {'id': self.getUniqueID(), 'plato': newDish2, 'cantidad':1, 'toppings': self.threeToppings};
	                } else {
	                	var newItem = {'id': self.getUniqueID(), 'plato': newDish2, 'cantidad':1, 'toppings': {}};
	               	}
	               	self.items.push(newItem);
	                $rootScope.$broadcast('OrdenService:itemAdded', newItem);
                }

            } else {
            	var newDish = new Plato(plato._id, plato.nombre, plato.precio);
            	var newDish2 = {'id': plato._id, 'nombre': plato.nombre, 'precio': plato.precio}
                if (self.threeToppings.length) {
            		var newItem = {'id': self.getUniqueID(), 'plato': newDish2, 'cantidad':1, 'toppings': self.threeToppings};
                } else {
                	var newItem = {'id': self.getUniqueID(), 'plato': newDish2, 'cantidad':1, 'toppings': {}};
               	}
               	self.items.push(newItem);
                $rootScope.$broadcast('OrdenService:itemAdded', newItem);
            }
            self.threeToppings = [];
            $rootScope.$broadcast('OrdenService:change', {});
		},
		'getItemById': function (platoId) {
			var items = self.items;
            var build = false;

            angular.forEach(items, function (item) {
                if  (item.plato.id === platoId) {
                    build = item;
                }
            });
            return build;
		},
		'getCart': function () {
			return this.$cart;
		},
		'getItems': function(){
            return self.items;
        },

        'getTotalItems': function () {
        	// console.log('getting total items');
            var count = 0;
            var items = self.getItems();
            angular.forEach(items, function (item) {
                count += item.cantidad;
            });
            // console.log(items);
            // console.log(count);
            return count;
        },
		'getUniqueID': function () {
			var date = new Date();
			var components = [
			    date.getYear(),
			    date.getMonth(),
			    date.getDate(),
			    date.getHours(),
			    date.getMinutes(),
			    date.getSeconds(),
			    date.getMilliseconds()
			];

			var id = components.join("");
			return id;
		},
		'getTotalUniqueItems': function () {
            return this.getCart().items.length;
        },
		'getSubTotal' : function(){
            var total = 0;
            angular.forEach(self.items, function (item) {
            	// console.log("en getSubTotal");
            	// console.log(item);

            	totalPrice = item.plato.precio * item.cantidad;
            	if (item.toppings.length) {
            		angular.forEach(item.toppings, function(topp) {
            			totalPrice += topp.precio;
            		})
            	}
            	// console.log(totalPrice);
                total += totalPrice;
                // console.log(total);
            });
            return +parseFloat(total).toFixed(2);
        },
		'totalCost' : function () {
            return +parseFloat(self.getSubTotal()).toFixed(2);
        },
        'getTotalItemCost': function (item) {
        	var totalItem = 0;
        	angular.forEach(item.toppings, function(top) {
        		totalItem += top.precio;
        	})
        	totalItem += item.plato.precio * item.cantidad;
        	return totalItem;
        },
		'removeItem': function (index) {
            this.$cart.items.splice(index, 1);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});

        },
		'removeItemById' : function (id) {
            var cart = this.getCart();
            angular.forEach(cart.items, function (item, index) {
                if  (item.getId() === id) {
                    cart.items.splice(index, 1);
                }
            });
            this.setCart(cart);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});
        },
		'removePlatoCart': function (plato) {
			// console.log(plato);
			var items = self.items;
			// console.log(items);
			angular.forEach(items, function (cart, index) {
				// console.log(cart);
				if (!cart.plato.toppings) {
					// console.log('im in');
					if (cart.plato.id === plato._id) {
						// console.log('im in 2');
						// console.log(cart.cantidad);
						if (cart.cantidad == 1) {
							self.items.splice(index, 1);	
						} else {
							cart.cantidad -= 1;
						}
						
					}
				}
				
			})
			$rootScope.$broadcast('OrdenService:itemRemoved', {});
            $rootScope.$broadcast('OrdenService:change', {});
		},
		'doSearch': function () {
			self.hasMore = true;
			self.page = 1;
			self.toppings = [];
			self.loadToppings();
		},
		'doOrder': function () {
			self.hasMore = true;
			self.page = 1;
			self.toppings = [];
			self.loadToppings();
		},
		'loadToppings': function () {
			if (self.hasMore && !self.isLoading) {
				self.isLoading = true;

				var params = {
					'page': self.page,
					'search': self.search,
					'ordering': self.ordering
				};
				// console.log(params);
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

				toppings = Topping.get();
				// console.log(toppings);

				// console.log('inside getting Topping data');
				// console.log(params);
				// console.log(toppings);
				angular.forEach(toppings, function (topping) {
					self.toppings.push(topping);
				});

				if (toppings) {
					self.hasMore = false;
				}
					//at the end we set it to false so it can be call again
				self.isLoading = false;
		 	}
		},
		'loadMore': function () {
			if (self.hasMore && !self.isLoading) {
				self.page += 1;
				self.loadToppings();
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
				var index = self.toppings.indexOf(plato);
				self.toppings.splice(index, 1);
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
				self.toppings = [];
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

	self.loadToppings();
	self.watchFilters();
	return self;
});