(function() {
	'use strict';
	angular.module('app')
	.controller('DashboardController', DashboardController);
	function DashboardController($stateParams, UserFactory, JobsFactory, $state, $scope) {
		var vm = this;
		vm.status = UserFactory.status;
		vm.jobType = {};
		UserFactory.getAllByUser(vm.status._id).then(function(res){
			vm.userArray = res;
			vm.determineActive(vm.userArray, UserFactory.status._id);
		});
		vm.determineActive = function(jobs, userID){
			vm.activeArr = [];
			vm.inactiveArrPost = [];
			vm.inactiveArrApply = [];
			for (var i = 0; i < jobs.posting.length; i++){
				if(jobs.posting[i].isConfirmed === true){
					vm.activeArr.push(jobs.posting[i]);
				} else {
					vm.inactiveArrPost.push(jobs.posting[i]);
				}
			}
			for (var j = 0; j < jobs.applying.length; j++){
				if(jobs.applying[j].isConfirmed === true){
					vm.activeArr.push(jobs.applying[j]);
				} else {
					vm.inactiveArrApply.push(jobs.applying[j]);
				}
			}
		};
		vm.completeJob = function(id) {
			if(confirm('Mark this job as completed?')===true){
				JobsFactory.completeJob(id).then(function(res){
				});
				$state.go('Rate', {id: id}, {location: true});
			}
		};
		vm.goToJob = function(id){
			$state.go('JobDetails', {id:id}, {location: true});
		};
		UserFactory.getUserInfo($stateParams.id).then(function(res){
			vm.userInfo = res;
		});
		//image upload
		vm.pic = function(){
			filepicker.setKey("AVkaqvPVuQCCSH059S4zQz");
			filepicker.pick({
				mimetype: 'image/*', /* Images only */
				maxSize: 1024 * 1024 * 5, /* 5mb */
				imageMax: [1500, 1500], /* 1500x1500px */
				cropRatio: 1/1, /* Perfect squares */
				services: ['*'] /* All available third-parties */
			}, function(blob){
				var url = blob.url;
				UserFactory.sendpPic(blob,vm.status._id).then(function(res){
					UserFactory.getUserInfo($stateParams.id).then(function(res){
						vm.userInfo = res;
					});
				});
			});
		};
		vm.infoEdit = function(i){
			UserFactory.infoEdit(i, vm.status._id).then(function(res){
				UserFactory.getUserInfo($stateParams.id).then(function(res){
					vm.userInfo = res;
				});
			});
		};
	}
})();
