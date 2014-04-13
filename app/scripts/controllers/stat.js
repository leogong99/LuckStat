/*global $:false, paintChart */

'use strict';

angular.module('luckStatApp')
	.controller('StatCtrl', function($scope, Records, _) {
		$scope.numbers = [];
		var luckRecords = [];
		var records = Records.query();
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

		// build record
		var _buildRecord = function() {
			//clean luck records.
			luckRecords = [];
			var selectedNumAry = [];
			var month = 0;
			var date = null;
			var numberofAppear = 0;

			// loop throught the selected number
			var selectedNumLen = $scope.selectedNumber.length;
			for (var i = 0; i < selectedNumLen; i++) {
				selectedNumAry.push($scope.selectedNumber[i].value);
			}

			// loop through records to rebuild data in month base
			$.each(records, function(inx, value) {
				//get the date
				date = new Date(value.date);

				// check if those numbers are appear in this draw.
				var hasWiningNum = _isArrayContainArray(selectedNumAry, value.numbers);
				if (month === date.getMonth()) { // same month
					if (hasWiningNum) {
						numberofAppear++;
					}
				} else {
					month = date.getMonth(); // different month. reset month and number of appear

					luckRecords.push({
						date: date.setDate(1),
						isWinningNumber: numberofAppear
					});
					numberofAppear = 0;
				}
			});
		};

		// call build chart
		var _buildChart = function() {
			paintChart(luckRecords);
		};

		// select number from pool
		$scope.selectNumber = function(number) {
			if (_.indexOf($scope.selectedNumber, number) !== -1) { // unselected
				number.selected = false;
				$scope.selectedNumber = _.without($scope.selectedNumber, number);
			} else if ($scope.selectedNumber.length === lotteryConfig.numofDraw) { // already full,
				return;
			} else { // add more selected number.
				number.selected = true;
				$scope.selectedNumber.push(number);
			}
			$scope.enoughSelection = $scope.selectedNumber.length === lotteryConfig.numofDraw ? true : false;
			_buildRecord();
			_buildChart();
		};
	});