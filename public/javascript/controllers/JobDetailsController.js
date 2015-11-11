(function() {
	'use strict';
	angular.module('app')
	.controller('JobDetailsController', JobDetailsController);

	function JobDetailsController(JobsFactory, UserFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;
		vm.status = UserFactory.status;
		vm.userType = {};

		JobsFactory.getJobById($stateParams.id).then(function(res){
			vm.job = res;
			vm.determineUser(vm.job, UserFactory.status._id);
			console.log(vm.job);
			var date = vm.job.createdDate; // Method .toLocalDateString turns the date into a method and cannot populate the date-
			vm.job.createdDate = new Date();// picker in the edit so I had to turn the string back into a date for it to work.
			vm.job.createdDate.setTime(Date.parse(date)); // http://stackoverflow.com/questions/32469737/angular-material-datepicker-date-tolocaledatestring-is-not-a-function
		});

		vm.determineUser = function(job, userID) {
			vm.userType = {
				isCreator: false,
				isApplicant: false,
				isNobody: true
			};

			if(job.createdBy == userID) {
				console.log("creator");
				vm.userType.isCreator = true;
				vm.userType.isApplicant = false;
				vm.userType.isNobody = false;
			}

			if(job.applicants){
				for (var i = 0; i < job.applicants.length; i++) {
					if (job.applicants[i].applicant && userID === job.applicants[i].applicant) {
						vm.userType.isApplicant = true;
						vm.userType.isCreator = false;
						vm.userType.isNobody = false;
						break;
					}
				}
			}
		};

		vm.deleteJob = function(id){
			if(vm.userType.isCreator) {
				JobsFactory.deleteJob(id).then(function() {
					$state.go('Services');
				});
			}
		};

		vm.updateJob = function(z) {
			if(vm.userType.isCreator) {
				JobsFactory.updateJob(z, {id:$stateParams.id}).then(function(res) {
					JobsFactory.getJobById($stateParams.id).then(function(res){
						vm.job = res;
					});
				});
			}
		};

		vm.applyJob = function(a){
			JobsFactory.applyJob(a, {id:$stateParams.id}).then(function(res) {
				vm.job = res;
				vm.userType.isApplicant = true;
				vm.userType.isNobody = false;
			});
		};

		vm.deleteApplicant = function(jobID, appID, index){
			JobsFactory.deleteApplicant(jobID, appID).then(function() {
				vm.job.applicants.splice(index, 1);
				vm.userType.isApplicant = false;
				vm.userType.isNobody = true;
			});
		};

	}
})();
