(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $mdSidenav, $state, JobsFactory, $stateParams, jwtHelper) {
		var vm = this;
		vm.isLogin = true;
		vm.user = {};
		vm.status = UserFactory.status;
		vm.msg = {};

		console.log(vm.status);

		vm.logout = function() {
			UserFactory.logout();
			$state.go('Splash');
		};

		vm.registerUser = function() {
			UserFactory.registerUser(vm.user).then(function() {
			});
		};

		vm.loginUser = function() {
			UserFactory.loginUser(vm.user).then(function() {
				$state.go('Dashboard');
				vm.user = {};
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

		vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
		'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
		'WY').split(' ').map(function(state) {
			return {abbrev: state};
		});

		vm.forgot = function() {
    		UserFactory.forgot(vm.user).then(function() {
    			// alert('Please check your email to change reset password.')
    		}) ;
    	} ;

			vm.resetPassword = function() {
				var tokenPayload = jwtHelper.decodeToken($stateParams.info);
				// console.log(tokenPayload);
				// console.log(tokenPayload.user.id);
				vm.user.id = tokenPayload.user.id;
    		UserFactory.resetPassword(vm.user).then(function(res) {
    			$state.go('Splash');
    		}) ;
    	} ;




	}
})();
