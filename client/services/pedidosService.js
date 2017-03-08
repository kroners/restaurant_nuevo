angular
	.module('app')
	.service('PedidosService', function (Pedidos, Pedido, $rootScope, $q, toaster) {

	var self = {
		'pedidos': [],
		'getPedidos': function () {
			lista = Pedidos.get();
			lista.$promise.then(function (data) {
				console.log('using promise with data pedidos');
				console.log(data);
				console.log(data.pedidos);
				console.log('inside getting data pedidos');
				angular.forEach(data.pedidos, function (pedido) {
					console.log(pedido);
					self.pedidos.push(new Pedido(pedido));
				});
				console.log(self.pedidos);
				if (!data.next) {
					self.hasMore = false;
				}
				//at the end we set it to false so it can be call again
				self.isLoading = false;
			});

			var lista = Promise.resolve(self.pedidos);
			lista.then(function (v) {
				console.log(v);
			});
		}
	};

	self.getPedidos();

	return self;

});

