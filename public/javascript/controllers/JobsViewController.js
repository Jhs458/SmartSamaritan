(function() {
	'use strict';
	angular.module('app')
	.controller('JobsViewController', JobsViewController);

	function JobsViewController(JobsFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;

		JobsFactory.getJobs().then(function(res){
			vm.jobs = res;
		});





  }
})();
