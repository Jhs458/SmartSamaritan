(function() {
	'use strict';
	angular.module('app')
	.controller('DashboardController', DashboardController);


	function DashboardController() {
		console.log("What happened John!!!");
		var vm = this;
		vm.title = 'Welcome to our App!';
	}
})();
