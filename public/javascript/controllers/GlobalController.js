(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $mdSidenav, $state) {
		var vm = this;
		vm.isLogin = true;
    vm.user = {};
    vm.status = UserFactory.status;




  }
})();
