(function() {
	'use strict';
	angular.module('app')
	.controller('CalendarController', CalendarController);

	function CalendarController(JobsFactory, $mdSidenav, $state,$stateParams, UserFactory) {
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

		vm.jobCom = function(c){
			if(confirm('Mark this job as completed?')===true){
				var ratingStr = prompt("Please Enter A Rating", "1-5");
				var ratingNum = parseInt(ratingStr,10);

				JobsFactory.completeJob(c._id, ratingNum).then(function(res){
				});
				for(var i=0; i<c.applicants.length; i++){                        //loops through applicants
					if(c.applicants[i].username == c.chosenApp[0]){        //pulls the chosenUsers id from applicants
						UserFactory.jobExp(c.applicants[i].applicant);    // +2 to experience
						UserFactory.jobCurrency(c.createdBy, c.applicants[i].applicant, c.currency);
						UserFactory.getUserInfo(c.applicants[i].applicant).then(function(res) {
							vm.userInfo= res;
							vm.ratingArr = [];
							var sum = 0;
							var rating = 0;
							for(var j = 0; j < vm.userInfo.rating.length; j++){
								vm.ratingArr.push(vm.userInfo.rating[j]);
								sum = vm.ratingArr.reduce(add, 0);
								function add(a, b){return a + b}
								rating = (sum / vm.userInfo.rating.length);
							}
							UserFactory.addRating(vm.userInfo._id, rating).then(function(){
							});
						});
					}
				}
				window.location.reload();
			}
			else{
				$state.go('Calendar');
			}
		};

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








	}
})();
