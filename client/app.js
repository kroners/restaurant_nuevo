angular
	.module('app',[
		'ngResource',
		'infinite-scroll',
		'angularSpinner',
		'jcs-autoValidate',
		'angular-ladda',
		'mgcrea.ngStrap',
		'toaster',
		'ngAnimate',
		'ui.router',
		'ngCookies',
		'ngMaterial'
]);


angular
	.module('app')
	.config(function ($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		// $httpProvider.defaults.headers.common['Authorization'] = 'Token 20002cd74d5ce124ae219e739e18956614aab490';
		$resourceProvider.defaults.stripTrailingSlashes = false;
		laddaProvider.setOption({
			style: 'expand-right'
		});
		angular.extend($datepickerProvider.defaults, {
			dateFormat: 'd/M/yyyy',
			autoclose: true
		});
	})
	.run(['$rootScope', 'OrdenService', 'UserService', function ($rootScope, OrdenService, UserService) {

        $rootScope.$on('OrdenService:change', function(){
            // OrdenService.$save();
        });

        $rootScope.$on('$routeChangeStart', function(){
        	OrdenService.checkUserSession();
        })

        // if (angular.isObject(store.get('cart'))) {
        //     ngCart.$restore(store.get('cart'));

        // } else {
        //     ngCart.init();
        // }

    }]);



angular
	.module('app')
	.filter('defaultImage', function () {
	return function (input, param) {
		if (!input) {
			return param
		}
		return input;
	}
});

