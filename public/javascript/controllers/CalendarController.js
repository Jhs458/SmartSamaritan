(function() {
	'use strict';
	angular.module('app')
	.controller('CalendarController', CalendarController);

	function CalendarController(JobsFactory, $mdSidenav, $state,$stateParams) {
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
			JobsFactory.getJobById($stateParams.id).then(function(res){
				vm.calendarPosts = res;
				console.log(res);
			});

			vm.jobCompleted = function(b){
				console.log(b);
				console.log(b.currency);
				// posterCurrency = posterCurrency - b.currency;
				// applicantCurrency = applicantCurrency + b.currency;
				JobsFactory.jobCompleted(b).then(function(res){
					console.log(res);
				});

 			};
		// }


  }

})();
