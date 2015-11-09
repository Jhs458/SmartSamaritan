(function() {
	'use strict';
	angular.module('app')
	.controller('JobDetailsController', JobDetailsController);

	function JobDetailsController(JobsFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;


 	JobsFactory.getJobById($stateParams.id).then(function(res){
				vm.job = res;
				var date = vm.job.createdDate; // Method .toLocalDateString turns the date into a method and cannot populate the date-
        vm.job.createdDate = new Date();// picker in the edit so I had to turn the string back into a date for it to work.
				vm.job.createdDate.setTime(Date.parse(date)); // http://stackoverflow.com/questions/32469737/angular-material-datepicker-date-tolocaledatestring-is-not-a-function
 			});

	vm.deleteJob = function(id){
			JobsFactory.deleteJob(id).then(function() {
					$state.go('Services');
							})
						}

	vm.updateJob = function(z) {
			JobsFactory.updateJob(z, {id:$stateParams.id}).then(function(res) {
				JobsFactory.getJobById($stateParams.id).then(function(res){
							vm.job = res;
			 			});
			});
		};

		vm.applyJob = function(a){
			JobsFactory.applyJob(a, {id:$stateParams.id}).then(function(res) {
				// JobsFactory.applyToJobModel(a, {id:$stateParams.id}).then(function(res) {
					JobsFactory.getJobById($stateParams.id).then(function(res){
							vm.job = res;
			 			});
					// });
			});
		}

		JobsFactory.getApplicants($stateParams.id).then(function(res){
					vm.applicants = res;
				});

		vm.deleteApplicant = function(a){
			JobsFactory.deleteApplicant(a).then(function() {
				JobsFactory.getApplicants($stateParams.id).then(function(res){
							vm.applicants = res;
						});
				});
						};

  }
})();
