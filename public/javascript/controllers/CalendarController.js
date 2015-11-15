(function() {
	'use strict';
	angular.module('app')
	.controller('CalendarController', CalendarController);

	function CalendarController(JobsFactory, $mdSidenav, $state,$stateParams, UserFactory) {
		var vm = this;

 // 		if($stateParams.id=="allCalendar"){
	// 	JobsFactory.getJobs().then(function(res){
	// 		console.log(res);
	// 		vm.calendarPosts = res;
	// 	});
	// }
	// 	else{
			JobsFactory.getJobById($stateParams.id).then(function(res){
				vm.calendarPosts = res;
				console.log(res);
			});
		// }

		vm.appAccept = function(c){
			for(var i=0; i<c.applicants.length; i++){						//loops through applicants 
				if(c.applicants[i].username == c.chosenApp[0]){		//pulls the chosenUsers id from applicants
					UserFactory.jobExp(c.applicants[i].applicant);	// +2 to experience
				}
			}
		};


  }
})();
