(function() {
    'use strict';

angular
	.module('app')
	.factory("Topping", function () {
		console.log("dummy Topping factory");
		var toppings = [
			{
				"_id": 1,
				"nombre": "Jamon en cuadritos",
				"cantidad": 150,
				"precio": 3.50
			},
			{
				"_id": 2,
				"nombre": "Aros de cebolla fritos",
				"cantidad": 200,
				"precio": 5.50
			},
			{
				"_id": 3,
				"nombre": "1/4 taza de Almendras",
				"cantidad": 250,
				"precio": 5.50
			},
			{
				"_id": 4,
				"nombre": "Palta",
				"cantidad": 250,
				"precio": 4.50
			},
			{
				"_id": 5,
				"nombre": "Trocitos de pollo a la plancha",
				"cantidad": 150,
				"precio": 4.00
			}
			];
	    return {
	        get: function(){
	            return toppings;
	        },
	        find: function(index){
	            return toppings[index];
	        }
	    };
	})

	.factory("Pedido", function ($resource) {
		return $resource("http://127.0.0.1:3000/pedido");
	})
	.factory("Pedidos", function ($resource) {
		return $resource("http://127.0.0.1:3000/historial");
	});

})();