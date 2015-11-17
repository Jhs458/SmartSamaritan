(function() {
	'use strict';
	angular.module('app')
	.controller('JobDetailsController', JobDetailsController);

	function JobDetailsController(JobsFactory, UserFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;
		vm.status = UserFactory.status;
		vm.userType = {};
		vm.handshake = false;


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
			console.log(a);
			JobsFactory.applyJob(a, {id:$stateParams.id}).then(function(res) {
				vm.job = res;
				vm.userType.isApplicant = true;
				vm.userType.isNobody = false;
			});
		};
			JobsFactory.getApplicants($stateParams.id).then(function(res){
					vm.applicants = res;
				});


		vm.deleteApplicant = function(jobID, appID, index){
			JobsFactory.deleteApplicant(jobID, appID).then(function() {
				vm.job.applicants.splice(index, 1);
				vm.userType.isApplicant = false;
				vm.userType.isNobody = true;
			});
		};


		vm.chooseApplicant = function(a){
			if(confirm('You sure to choose this person?')===true){
			console.log(a);
			JobsFactory.chooseApplicant(a, $stateParams.id).then(function(res){
				vm.userType.isApplicant = false;
				vm.userType.isCreator = true;
				vm.userType.isNobody = false;
				window.location.reload();
				//$state.go('Services');
			});
		}
			else{
				return;
			}
		};


		vm.appAccept = function(c,index){
			if(confirm('You sure to accept this job?')===true){
				console.log($stateParams.id);
				JobsFactory.getJobByCanlendar(c,$stateParams.id).then(function(res){

				});
					$state.go('Calendar');
					  //$stateParams
		}
			else{
				JobsFactory.appDecline(c, $stateParams.id).then(function(){
					console.log(c);
					// vm.job.applicants.splice(index[1], 1);
					vm.job.chosenApp.splice(index,1);
				}) ;
			}
		};




		vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
		'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
		'WY').split(' ').map(function(state) {
			return {abbrev: state};
		});


	}


})();
