(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $mdSidenav, $state) {
		var vm = this;
		vm.isLogin = true;
    vm.user = {};
    vm.status = UserFactory.status;

	vm.logout = function() {
	UserFactory.logout();
	$state.go('Home');
};

vm.registerUser = function() {
	UserFactory.registerUser(vm.user).then(function() {
		$state.go('Home');
	});
};

vm.loginUser = function() {
	UserFactory.loginUser(vm.user).then(function() {
		$state.go('Home');
		vm.user = {};
	});
};


  }
})();
