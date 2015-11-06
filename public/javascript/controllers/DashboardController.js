(function() {
	'use strict';
	angular.module('app')
	.controller('DashboardController', DashboardController);


	function DashboardController() {
		var vm = this;
		vm.title = 'Welcome to our App!';
	}
})();
