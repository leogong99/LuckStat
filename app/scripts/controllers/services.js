'use strict';

/* Services */

var luckNumServices = angular.module('luckNumServices', ['ngResource']);

//load data from data file.
luckNumServices.factory('Records', ['$resource',
	function($resource) {
		return $resource('data/649.json', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);