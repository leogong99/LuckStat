/*global $:false, paintChart */

'use strict';

angular.module('luckStatApp')
	.controller('StatCtrl', function($scope, Records, _) {
		$scope.numbers = [];
		var records = Records.query();
		var lotteryConfig = {
			name: 'BC 649',
			numofDraw: 6,
			numoBonus: 1,
			poolMin: 1,
			poolMax: 49
		};
		$scope.selectedNumber = [];

		$scope.enoughSelection = false;
		$scope.numberEmpty = true;
		$scope.numofMore = lotteryConfig.numofDraw;
		for (var i = lotteryConfig.poolMin; i <= lotteryConfig.poolMax; i++) {
			$scope.numbers.push({
				value: i,
				selected: false
			});
		}

		var _isArrayContainArray = function(arr1, arr2) {
			return arr1.length === _.intersection(arr2, arr1).length ? 1 : 0;
		};

		// build record
		var _buildRecord = function() {
			//clean luck records.
			var selectedNumAry = [];
			var month = null;
			var date = null;

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
				var winningDate = null;
				$scope.numOfAppear += hasWiningNum;
				$scope.totalDraw++;
				var monthWinning = {};

				//TODO RECODE HOW TO FIND WINNING RECORD.
				if (month === date.getMonth()) { // same month
					monthWinning.isWinningNumber += hasWiningNum;
				} else {
					month = date.getMonth();
					monthWinning = {
						date: date.setDate(1),
						isWinningNumber: hasWiningNum
					};
					$scope.luckRecords.push(monthWinning);
				}
				if (hasWiningNum === 1) {
					winningDate = new Date(date);
					$scope.winningRecords.push({
						winningDate: winningDate.getMonth() + '/' + winningDate.getDate() + '/' + winningDate.getFullYear()
					});
				}
			});
		};

		// call build chart
		var _buildChart = function() {
			paintChart($scope.luckRecords);
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
			$scope.numberEmpty = $scope.selectedNumber.length === 0 ? true : false;
			$scope.numofMore = lotteryConfig.numofDraw - $scope.selectedNumber.length;
			$scope.numOfAppear = 0;
			$scope.totalDraw = 0;
			$scope.luckRecords = [];
			$scope.winningRecords = [];
			_buildRecord();
			_buildChart();
			$scope.percentageDraw = ($scope.numOfAppear / $scope.totalDraw * 100).toFixed(8) + '%';
		};
	});