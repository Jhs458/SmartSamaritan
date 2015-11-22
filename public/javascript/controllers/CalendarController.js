(function() {
	'use strict';
	angular.module('app')
	.controller('CalendarController', CalendarController);

	function CalendarController(JobsFactory, $mdSidenav, $state, $stateParams, UserFactory, $mdDialog) {
		var vm = this;
		var posterCurrency = 100;
		var applicantCurrency =100;
		vm.calendarPosts = {};

		JobsFactory.getJobs().then(function(res){
			vm.calendarPosts = res;

			vm.colorTiles = (function() {
				var tiles = [];
				for (var i = 0; i < vm.calendarPosts.length; i++) {
					if(vm.calendarPosts[i].isConfirmed){
						tiles.push({
							color: randomColor(),
							colspan: randomSpan(),
							rowspan: randomSpan(),
							calendarPosts: vm.calendarPosts[i]
						});
					}
				}
				return tiles;
			})();
		});

		var COLORS = ['#788AA3', '#FFCEBA', '#E06C9F', '#73956F', '#DEE5E5', '#427AA1', '#CF9893', '#BC7C9C', '#F46036'];

		function randomColor() {
			return COLORS[Math.floor(Math.random() * COLORS.length)];
		}

		function randomSpan() {
			var r = Math.random();
			if (r < 0.8) {
				return 1;
			} else if (r < 0.9) {
				return 2;
			} else {
				return 3;
			}
		}

		vm.completeJob = function(id) {
			if(confirm('Mark this job as completed?')===true){
			JobsFactory.completeJob(id).then(function(res){
			});
			$state.go('Rate', {id: id}, {location: true});
		}
		};




	}
})();
