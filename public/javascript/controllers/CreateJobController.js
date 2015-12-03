(function() {
	'use strict';
	angular.module('app')
	.controller('CreateJobController', CreateJobController);

	function CreateJobController(JobsFactory, $mdSidenav, $state) {
		var vm = this;

		vm.job={};
		vm.addJobs = function(){
			JobsFactory.createJobs(vm.job).then(function(res) {
				$state.go('JobsView', {cat: "allCategeories"});
			}, function(res) {
				vm.job = res;
			});
		};
		vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
		'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
		'WY').split(' ').map(function(state) {
			return {abbrev: state};
		});

	}
})();
