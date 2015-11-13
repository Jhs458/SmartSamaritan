(function() {
	'use strict';
	angular.module('app')
	.controller('CalendarController', CalendarController);

	function CalendarController(JobsFactory, $mdSidenav, $state,$stateParams) {
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


  }
})();
