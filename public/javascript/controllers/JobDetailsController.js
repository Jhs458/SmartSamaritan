(function() {
	'use strict';
	angular.module('app')
	.controller('JobDetailsController', JobDetailsController);


	function JobDetailsController(JobsFactory, UserFactory, $mdSidenav, $state, $stateParams, $mdToast, $mdDialog) {
		var vm = this;
		vm.status = UserFactory.status;
		vm.userType = {};
		vm.showEditJob = false;

		JobsFactory.getJobById($stateParams.id).then(function(res){
			vm.job = res;
			vm.determineUser(vm.job, UserFactory.status._id);
			var date = vm.job.createdDate; // Method .toLocalDateString turns the date into a method and cannot populate the date-
			vm.job.createdDate = new Date();// picker in the edit so I had to turn the string back into a date for it to work.
			vm.job.createdDate.setTime(Date.parse(date)); // http://stackoverflow.com/questions/32469737/angular-material-datepicker-date-tolocaledatestring-is-not-a-function
		});
		vm.determineUser = function(job, userID) {
			vm.userType = {
				isCreator: false,
				isApplicant: false,
				isBanned: false,
				isNobody: true
			};
			if(job.declinedHandshake === userID) {
				vm.userType.isCreator = false;
				vm.userType.isApplicant = false;
				vm.userType.isNobody = false;
				vm.userType.isBanned = true;
			}
			if(job.declinedHandshake == userID) {
				vm.userType.isCreator = false;
				vm.userType.isApplicant = false;
				vm.userType.isNobody = false;
				vm.userType.isBanned = true;
			}
			if(job.createdBy == userID) {
				vm.userType.isCreator = true;
				vm.userType.isApplicant = false;
				vm.userType.isNobody = false;
				vm.userType.isBanned = false;
			}
			if(job.applicants){
				for (var i = 0; i < job.applicants.length; i++) {
					if ((job.applicants[i].applicant && userID === job.applicants[i].applicant) &&
					(job.applicants[i].applicant && userID !== job.declinedHandshake)) {
						vm.userType.isApplicant = true;
						vm.userType.isCreator = false;
						vm.userType.isNobody = false;
						vm.userType.isBanned = false;
						break;
					}
				}
			}
		};
		vm.deleteJob = function(id){
			if(confirm('Delete this job? This action cannot be undone.')===true){
				if(vm.userType.isCreator) {
					JobsFactory.deleteJob(id).then(function() {
						$state.go('Services');
					});
				}
			}
		};
		vm.lastEditInfo = {};
		vm.editJob = function() {
			vm.lastEditInfo = angular.copy(vm.job);
			vm.showEditJob = !vm.showEditJob;
		};
		vm.cancelEditJob = function() {
			vm.job = vm.lastEditInfo;
			vm.showEditJob = false;
		};
		vm.updateJob = function(z) {
			z = vm.job;
			if(vm.userType.isCreator) {
				JobsFactory.updateJob(z, {id:$stateParams.id}).then(function(res) {
					JobsFactory.getJobById($stateParams.id).then(function(res){
						vm.job = res;
					});
				});
			}
		};
		vm.goBack = function(_id) {
			$state.go('JobDetails', {_id:_id}, {location: true});
		};
		vm.applyJob = function(a){
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
			if(confirm('Delete Application?')===true){
				JobsFactory.deleteApplicant(jobID, appID).then(function() {
					vm.job.applicants.splice(index, 1);
					vm.userType.isApplicant = false;
					vm.userType.isNobody = true;
				});
			}
		};
		vm.chooseApplicant = function(a){
			if(confirm('Confirm Applicant?')===true){
				JobsFactory.chooseApplicant(a, $stateParams.id).then(function(res){
					vm.userType.isApplicant = false;
					vm.userType.isCreator = true;
					vm.userType.isNobody = false;
					window.location.reload();
				});
			}
			else{
				return;
			}
		};
		vm.appAccept = function(c,index){
			if(confirm('Are you sure you would like to accept?')===true){
				JobsFactory.getJobByCanlendar(c,$stateParams.id).then(function(res){
				});
				$state.go('Dashboard', {id: vm.status.id}, {location: true});
			}
			else{
				JobsFactory.appDecline(c, $stateParams.id).then(function(){
					vm.job.chosenApp.splice(index,1);
					vm.userType.isApplicant = false;
					vm.userType.isBanned = true;
					vm.job.declinedHandshake = vm.status.id;
				}) ;
			}
		};
		vm.data = {
			cb5: false
		};
		vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
		'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
		'WY').split(' ').map(function(state) {
			return {abbrev: state};
		});
		vm.sendMsg2 = function(id){
			vm.msg.sentTo = id;
			JobsFactory.sendMsg(vm.msg).then(function(res) {
				vm.msg = {};
				vm.sendPMsg = !vm.sendPMsg;
			});
		};
		vm.showAdvanced = function(ev, a) {
			UserFactory.getUserInfo(a.applicant).then(function(res){
				vm.viewApp = res;
				$mdDialog.show({
					controller: JobDetailsController,
					template: [
						'<md-dialog layout-padding style="margin: 60px; text-align:center; width:400px;">',
						'<h2>', vm.viewApp.username, '</h2>',
						'<img ng-src="',vm.viewApp.photo,'" class="modal-photo">',
						'<h2><i class="zmdi zmdi-star"></i>', ' Rating:', '</h2>',
						'<h3>', vm.viewApp.computedRating,'</h3>',
						'<h2><i class="zmdi zmdi-wrench"></i>', ' Experience:', '</h2>',
						'<h3>', vm.viewApp.experience,'</h3>',
						'<h2>', 'Location:', '</h2>',
						'<h3>', vm.viewApp.location.street, '</h3>',
						'<h3>', vm.viewApp.location.city,' ' , ' ',vm.viewApp.location.state,' , ',' ',vm.viewApp.location.zip, '</h3>',
						'</md-dialog>',
					].join(''),
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				});
			});
		};
		vm.showAdvanced2 = function(ev, a) {
			UserFactory.getUserInfo(a).then(function(res){
				vm.viewApp = res;
				$mdDialog.show({
					controller: JobDetailsController,
					template: [
						'<md-dialog layout-padding style="margin: 60px; text-align:center; width:400px;">',
						'<h2>', vm.viewApp.username, '</h2>',
						'<img ng-src="',vm.viewApp.photo,'" class="modal-photo">',
						'<h2><i class="zmdi zmdi-star"></i>', ' Rating:', '</h2>',
						'<h3>', vm.viewApp.computedRating,'</h3>',
						'<h2><i class="zmdi zmdi-wrench"></i>', 'Experience:', '</h2>',
						'<h3>', vm.viewApp.experience,'</h3>',
						'<h2>', 'Location:', '</h2>',
						'<h3>', vm.viewApp.location.street, '</h3>',
						'<h3>', vm.viewApp.location.city,' ' , ' ',vm.viewApp.location.state,' , ',' ',vm.viewApp.location.zip, '</h3>',
						'</md-dialog>',
					].join(''),
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				});
			});
		};

	}
})();
