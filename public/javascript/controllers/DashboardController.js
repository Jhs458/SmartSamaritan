(function() {
	'use strict';
	angular.module('app')
	.controller('DashboardController', DashboardController);
	function DashboardController($stateParams, UserFactory, $state) {
		var vm = this;
		vm.status = UserFactory.status;

		UserFactory.getAllByUser(vm.status._id).then(function(res){
			vm.userArray = res;
		});

		vm.goToJob = function(id){
			$state.go('JobDetails', {id:id}, {location: true});
		};

		UserFactory.getUserInfo($stateParams.id).then(function(res){
			vm.userInfo = res;
		});

	}
})();
