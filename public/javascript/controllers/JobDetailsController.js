(function() {
	'use strict';
	angular.module('app')
	.controller('JobDetailsController', JobDetailsController);

	function JobDetailsController(JobsFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;


		// if(!$stateParams.id) $state.go('Dashboard');//This means, is this Id exists, run the function inside.
	console.log($stateParams.id);
 JobsFactory.getJobById($stateParams.id).then(function(res){
	 console.log(res);

	vm.job = res;
 });





  }
})();
