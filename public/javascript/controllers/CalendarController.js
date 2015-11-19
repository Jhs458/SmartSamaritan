(function() {
	'use strict';
	angular.module('app')
	.controller('CalendarController', CalendarController);

	function CalendarController(JobsFactory, $mdSidenav, $state,$stateParams, UserFactory) {
		var vm = this;
		var posterCurrency = 100;
		var applicantCurrency =100;

		JobsFactory.getJobs().then(function(res){
			vm.calendarPosts = res;
			console.log(res);
		});

		vm.jobCom = function(c){
			if(confirm('Mark this job as completed?')===true){
				JobsFactory.completeJob(c._id).then(function(res){
				});
				for(var i=0; i<c.applicants.length; i++){                        //loops through applicants
					if(c.applicants[i].username == c.chosenApp[0]){        //pulls the chosenUsers id from applicants
						UserFactory.jobExp(c.applicants[i].applicant);    // +2 to experience
						UserFactory.jobCurrency(c.createdBy, c.applicants[i].applicant,c.currency);
						// UserFactory.removeToken();
						// UserFactory.loginUser(c.createdBy);
						// console.log(c.createdBy, 'after token');
					}
				}
				window.location.reload();
			}
			else{
				$state.go('Calendar');
			}
		};
	}

})();
