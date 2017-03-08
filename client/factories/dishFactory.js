(function() {
    'use strict';

angular
    .module('app')
    .factory("Platos", function ($resource) {
	return $resource("http://127.0.0.1:3000/platos");
});

angular
    .module('app')
    .factory("Plato", function ($resource) {
	return $resource("http://127.0.0.1:3000/plato/:id", {id: '@id'}, {
		update: { method: 'PUT'	}
	});
});
})();
