angular
    .module('app')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'main': {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
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
					controller: 'LoginUsuarioController'
				}
			}
		})
		.state('orden', {
			url: '/orden',
			views: {
				'main': {
					templateUrl: 'templates/carrito.html',
					controller: 'PedidoController'
				}
			}
		})
		.state('pedidos', {
			url:'/pedidos',
			views: {
				'main': {
					templateUrl: 'templates/pedidos.html',
					controller: 'PedidoController'
				}
			}
		})
		.state('info', {
			url: '/detalleOrden',
			views: {
				'main': {
					templateUrl: 'templates/detalleOrden.html',
					controller: 'PedidoController'
				}
			}
		})
		;

	$urlRouterProvider.otherwise('/');
}