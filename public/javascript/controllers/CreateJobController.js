(function() {
	'use strict';
	angular.module('app')
	.controller('CreateJobController', CreateJobController);

	function CreateJobController(JobsFactory, $mdSidenav, $state) {
		var vm = this;
		vm.job = {};

		vm.addJobs = function(){
			JobsFactory.createJobs(vm.job).then(function(){
				$state.go('JobsView', {cat: "allCategeories"});
			});
		};





  }
})();
