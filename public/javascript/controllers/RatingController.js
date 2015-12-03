(function() {
	'use strict';
	angular.module('app')
	.controller('RatingController', RatingController);
	function RatingController($stateParams, JobsFactory, UserFactory, $state) {
		var vm = this;
		var ratingNum = 0;
		vm.c = null;

		JobsFactory.getJobById($stateParams.id).then(function(res){
			vm.c = res;
		});
		vm.setRating = function(rating){
			ratingNum = rating;
			vm.submitRating = function() {
				if(ratingNum > 0){
					for(var i=0; i< vm.c.applicants.length; i++){                        //loops through applicants
						if(vm.c.applicants[i].username == vm.c.chosenApp[0]){        //pulls the chosenUsers id from applicants
							UserFactory.jobExp(vm.c.applicants[i].applicant);    // +2 to experience
							UserFactory.jobCurrency(vm.c.createdBy, vm.c.applicants[i].applicant, vm.c.currency);
							UserFactory.getUserInfo(vm.c.applicants[i].applicant).then(function(res) {
								vm.userInfo = res;
								vm.ratingArr = [];
								var sum = 0;
								var compRating = 0;
								for(var j = 0; j < vm.userInfo.rating.length; j++){
									vm.ratingArr.push(vm.userInfo.rating[j]);
								}
								sum = vm.ratingArr.reduce(add, 0);
								function add(a, b){return a + b}
								compRating = ((sum + ratingNum) / (vm.userInfo.rating.length += 1));
								UserFactory.addRating(vm.userInfo._id, compRating, ratingNum).then(function(){
								});
							});
					}
				}
					$state.go('Dashboard', {id: vm.c.createdBy});
				}
				else{
					alert('You Must Choose a Rating');
				}
			};
		};
		$(function() {
			$("#rating li a").click(function() {
				$('li a.active').removeClass('active');
				$(this).addClass("active");
			});
		});

	}
})();
