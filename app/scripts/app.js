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
				controller: 'StatCtrl'
			})
			.when('/chance', {
				templateUrl: 'views/partials/chance.html',
				controller: 'ChanceCtrl'
			})
			.when('/formula', {
				templateUrl: 'views/partials/formula.html',
				controller: 'FormulaCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});