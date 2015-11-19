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
				$state.go('Services');
				vm.user = {};
			});
		};

		vm.close = function () {
			$mdSidenav('right').toggle();
		};

		vm.toggleRight = function (sentTo) {
			$mdSidenav('right').toggle();
			// console.log(m);
		vm.sendMsg = function(){
			vm.msg.sentTo = sentTo
			JobsFactory.sendMsg(vm.msg).then(function(res) {
				// vm.close();
				vm.msg = {};
			});
		};
		};

		JobsFactory.getMessagesById().then(function(res) {
			vm.msgs = res;
			console.log(vm.msgs);
			vm.oneArr = [];
			vm.friends = [];
			for(var i = 0; i < vm.msgs.createdBy.length; i ++){
				vm.oneArr.push(vm.msgs.createdBy[i]);
				if (vm.friends.indexOf(vm.msgs.createdBy[i].sentTo) === -1){
				          vm.friends.push(vm.msgs.createdBy[i].sentTo);
				}

			}
			for(var x = 0; x < vm.msgs.sentTo.length; x ++){
				vm.oneArr.push(vm.msgs.sentTo[x]);
				if (vm.friends.indexOf(vm.msgs.sentTo[x].createdBy) === -1){
				          vm.friends.push(vm.msgs.sentTo[x].createdBy);
				}

			}
			// console.log(vm.msgs.createdBy);
			// console.log(vm.msgs.sentTo);
			console.log(vm.oneArr, 'oneArr');
			console.log(vm.friends, 'friends');


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
