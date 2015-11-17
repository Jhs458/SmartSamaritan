(function() {
	'use strict';
	angular.module('app')
	.controller('CalendarController', CalendarController);

	function CalendarController(JobsFactory, $mdSidenav, $state,$stateParams, UserFactory) {
		var vm = this;
		var posterCurrency = 100;
		var applicantCurrency =100;

 // 		if($stateParams.id=="allCalendar"){
	// 	JobsFactory.getJobs().then(function(res){
	// 		console.log(res);
	// 		vm.calendarPosts = res;
	// 	});
	// }
	// 	else{
			JobsFactory.getJobs().then(function(res){
				vm.calendarPosts = res;
				console.log(res);
			});

			// vm.jobCompleted = function(b){
			// 	console.log(b);
			// 	console.log(b.currency);
			// 	// posterCurrency = posterCurrency - b.currency;
			// 	// applicantCurrency = applicantCurrency + b.currency;
			// 	JobsFactory.jobCompleted(b).then(function(res){
			// 		console.log(res);
			// 	});
			//
 		// 	};
		// }

		vm.appAccept = function(c){
			for(var i=0; i<c.applicants.length; i++){						//loops through applicants
				if(c.applicants[i].username == c.chosenApp[0]){		//pulls the chosenUsers id from applicants
					UserFactory.jobExp(c.applicants[i].applicant);	// +2 to experience
				}
			}
		};

		vm.jobCurrency = function(c){
			console.log(c);
			for(var i=0; i < c.applicants.length; i++){						//loops through applicants
				if(c.applicants[i].username == c.chosenApp[0]){		//pulls the chosenUsers id from applicants
					UserFactory.jobCurrency(c.createdBy, c.applicants[i].applicant,c.currency);	// +2 to experience
				}
			}
		};


  }

})();
