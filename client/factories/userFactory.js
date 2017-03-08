(function() {
    'use strict';

angular
    .module('app')
    .factory("Usuario", function ($resource) {
	return $resource("http://127.0.0.1:3000/registro");
});

angular
    .module('app')
    .factory("LoginUsuario", function ($resource) {
	return $resource("http://127.0.0.1:3000/login");
});

angular
    .module('app')
    .factory("UpdateUsuario", function ($resource) {
	return $resource("http://127.0.0.1:3000/updateUser");
});

})();