(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $mdSidenav, $state, JobsFactory, $stateParams, jwtHelper, $rootScope) {
		var vm = this;
		vm.isLogin = true;
		vm.user = {};
		vm.status = UserFactory.status;
		vm.msg = {};
		vm.oneArr = [];
		vm.hideTheThing = false;

		$rootScope.$on('$locationChangeSuccess', function(e, newUrl) {
			if ((/rating/i).test(newUrl) === true) {
				vm.hideTheThing = true;
			} else{
				vm.hideTheThing = false;
			}
		});
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
				vm.getMessages();
			});
		};
		vm.close = function () {
			$mdSidenav('right').toggle();
		};
		vm.toggleRight = function () {
			$mdSidenav('right').toggle();
		};
		vm.sendMsg = function(id){
			vm.msg.sentTo = id;
			JobsFactory.sendMsg(vm.msg).then(function(res) {
				vm.msg = {};
			});
		};
		vm.getMessages = function(){
			JobsFactory.getMessagesById().then(function(res) {
				vm.msgs = res;
				vm.friendsId = [];
				vm.friends = [];
				for(var i = 0; i < vm.msgs.createdBy.length; i ++){
					vm.oneArr.push(vm.msgs.createdBy[i]);
					if (vm.friendsId.indexOf(vm.msgs.createdBy[i].sentTo._id) === -1){
						vm.friendsId.push(vm.msgs.createdBy[i].sentTo._id);
						vm.friends.push(vm.msgs.createdBy[i].sentTo);
					}
				}
				for(var x = 0; x < vm.msgs.sentTo.length; x ++){
					vm.oneArr.push(vm.msgs.sentTo[x]);
					if (vm.friendsId.indexOf(vm.msgs.sentTo[x].createdBy._id) === -1){
						vm.friendsId.push(vm.msgs.sentTo[x].createdBy._id);
						vm.friends.push(vm.msgs.sentTo[x].createdBy);
					}
				}
			});
		};
		vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
		'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
		'WY').split(' ').map(function(state) {
			return {abbrev: state};
		});
		vm.forgot = function() {
			UserFactory.forgot(vm.user).then(function() {
			}) ;
		} ;
		vm.resetPassword = function() {
			var tokenPayload = jwtHelper.decodeToken($stateParams.info);
			vm.user.id = tokenPayload.user.id;
			UserFactory.resetPassword(vm.user).then(function(res) {
				$state.go('Splash');
			}) ;
		};
		vm.friendsShow = function(f){
			vm.friends = !vm.friends;
			vm.thatUser = f;
			vm.convo = [];
			for(var i = 0; i < vm.oneArr.length; i++) {
				if(_.filter(vm.oneArr[i].createdBy._id == f || vm.oneArr[i].createdBy == f || vm.oneArr[i].sentTo._id == f || vm.oneArr[i].sentTo == f)){
				}
			}
		};
		vm.friendsShow2 = function(){
			vm.friends = !vm.friends;
			if(Object.keys(vm.status).length !== 0){
				JobsFactory.getMessagesById().then(function(res) {
					vm.msgs = res;
					vm.friendsId = [];
					vm.friends = [];
					for(var i = 0; i < vm.msgs.createdBy.length; i ++){
						vm.oneArr.push(vm.msgs.createdBy[i]);
						if (vm.friendsId.indexOf(vm.msgs.createdBy[i].sentTo._id) === -1){
							vm.friendsId.push(vm.msgs.createdBy[i].sentTo._id);
							vm.friends.push(vm.msgs.createdBy[i].sentTo);
						}
					}
					for(var x = 0; x < vm.msgs.sentTo.length; x ++){
						vm.oneArr.push(vm.msgs.sentTo[x]);
						if (vm.friendsId.indexOf(vm.msgs.sentTo[x].createdBy._id) === -1){
							vm.friendsId.push(vm.msgs.sentTo[x].createdBy._id);
							vm.friends.push(vm.msgs.sentTo[x].createdBy);
						}
					}
				});
			}
		};

	}
})();
