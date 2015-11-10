(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $mdSidenav, $state, JobsFactory) {
		var vm = this;
		vm.isLogin = true;
		vm.user = {};
		vm.status = UserFactory.status;
		vm.msg = {};


		vm.logout = function() {
			UserFactory.logout();
			$state.go('Splash');
		};

		vm.registerUser = function() {
			UserFactory.registerUser(vm.user).then(function() {
				$state.go('Dashboard');
			});
		};

		vm.loginUser = function() {
			UserFactory.loginUser(vm.user).then(function() {
				$state.go('Dashboard');
				vm.user = {};
				nav.user.username= null;
				console.log(vm.status);
			});
		};

		vm.close = function () {
			$mdSidenav('right').toggle();
		};

		vm.toggleRight = function () {
			$mdSidenav('right').toggle();
		};

		vm.sendMsg = function(){
			JobsFactory.sendMsg(vm.msg).then(function(res) {
				// vm.close();
				vm.msg = {};
			});
		};

		JobsFactory.getAllMessages().then(function(res) {
			vm.messages = res;
		});


	}
})();
