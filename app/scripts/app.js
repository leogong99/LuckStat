'use strict';

angular.module('luckStatApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'underscore',
	'luckNumServices'
])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/partials/main.html'
			})
			.when('/stat', {
				templateUrl: 'views/partials/stat.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});