'use strict';

angular.module('luckStatApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'underscore'
])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/partials/main.html',
				controller: 'MainCtrl'
			})
			.when('/stat', {
				templateUrl: 'views/partials/stat.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});