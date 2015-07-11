angular.module('website.routes').
config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: '../index.html',
			controller: 'mainController'
		});
		$routeProvider.otherwise({
			redirectTo: '/home'
		});
	}
]);