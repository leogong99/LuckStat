'use strict';

/* Services */

var luckNumServices = angular.module('luckNumServices', ['ngResource']);

luckNumServices.factory('Records', ['$resource',
	function($resource) {
		return $resource('data/:649Data.json', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);