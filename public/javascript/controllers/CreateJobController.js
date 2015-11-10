(function() {
	'use strict';
	angular.module('app')
	.controller('CreateJobController', CreateJobController);

	function CreateJobController(JobsFactory, $mdSidenav, $state) {
		var vm = this;

		vm.job={};
		// console.log(vm.job);

		vm.addJobs = function(){
			JobsFactory.createJobs(vm.job).then(function(res) {
				$state.go('JobsView', {cat: "allCategeories"});
			}, function(res) {
					vm.job = res;
			});
		};






  }
})();
