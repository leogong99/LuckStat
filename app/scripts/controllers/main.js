/*global $:false, paintChart */

'use strict';

angular.module('luckStatApp')
	.controller('MainCtrl', function($scope, $http, _) {
		$scope.numbers = [];
		var luckRecords = [];
		var records = 90;
		var lotteryConfig = {
			name: 'BC 649',
			numofDraw: 6,
			numoBonus: 1,
			poolMin: 1,
			poolMax: 49
		};
		$scope.selectedNumber = [];
		for (var i = lotteryConfig.poolMin; i <= lotteryConfig.poolMax; i++) {
			$scope.numbers.push({
				value: i,
				selected: false
			});
		}

		var _isArrayContainArray = function(arr1, arr2) {
			return arr1.length === _.intersection(arr2, arr1).length;
		};

		var _buildRecord = function() {
			//clean luck records.
			luckRecords = [];
			var selectedNumAry = [];
			var month = 0;
			var date = null;
			var numberOfApear = 0;

			for (var i = 0; i < $scope.selectedNumber.length; i++) {
				selectedNumAry.push($scope.selectedNumber[i].value);
			}
			$.each(records, function(inx, value) {
				date = new Date(value.date);
				var hasWiningNum = _isArrayContainArray(selectedNumAry, value.numbers);
				if (month === date.getMonth()) {
					if (hasWiningNum) {
						numberOfApear++;
					}
				} else {
					month = date.getMonth();

					luckRecords.push({
						date: date.setDate(1),
						isWinningNumber: numberOfApear
					});
					numberOfApear = 0;
				}
			});
		};
		var _buildChart = function() {
			paintChart(luckRecords);
		};
		$scope.selectNumber = function(number) {
			if (_.indexOf($scope.selectedNumber, number) !== -1) {
				number.selected = false;
				$scope.selectedNumber = _.without($scope.selectedNumber, number);
			} else if ($scope.selectedNumber.length === lotteryConfig.numofDraw) {
				return;
			} else {
				number.selected = true;
				$scope.selectedNumber.push(number);
			}
			_buildRecord();
			_buildChart();
		};
		$http.get('data/649.json').success(function(data) {
			records = data;
		});

	});