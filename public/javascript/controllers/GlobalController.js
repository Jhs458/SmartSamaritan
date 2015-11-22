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
		vm.oneArr = [];
		console.log(vm.status, 'status');

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
			// console.log(m);
		};

		vm.sendMsg = function(id){
			// console.log(id);
			vm.msg.sentTo = id;
			JobsFactory.sendMsg(vm.msg).then(function(res) {
				// vm.close();
				vm.msg = {};
			});
		};


		vm.getMessages = function(){
		JobsFactory.getMessagesById().then(function(res) {
			vm.msgs = res;
			console.log(vm.msgs, 'msgs');
			// oneArr = [];
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
			console.log(vm.oneArr, 'oneArr');
			console.log(vm.friends, 'friends');
		});
	}

	// vm.imID = vm.setImmediate(vm.getMessages());
	// if(Object.keys(vm.status).length !== 0){
	// if(vm.status._id){
	// 	// vm.getMessages();
	// 	vm.imID = vm.setImmediate(vm.getMessages());
	// 	console.log("run messaging");
	// }

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

	vm.friendsShow = function(f){
		vm.friends = !vm.friends;
		vm.thatUser = f;
		vm.convo = [];
		console.log(vm.thatUser._id, 'f this');
		console.log(vm.oneArr);
		for(var i = 0; i < vm.oneArr.length; i++) {
			console.log(vm.oneArr[i])
			if(_.filter(vm.oneArr[i].createdBy._id == f || vm.oneArr[i].createdBy == f || vm.oneArr[i].sentTo._id == f || vm.oneArr[i].sentTo == f)){
				vm.convo.push(vm.oneArr[i])
			}

		}
		console.log(vm.convo,"Convo")

	}

	vm.friendsShow2 = function(){
		// vm.convo.splice(0, vm.convo.length);
		vm.friends = !vm.friends;
		if(Object.keys(vm.status).length !== 0){
			JobsFactory.getMessagesById().then(function(res) {
				vm.msgs = res;
				console.log(vm.msgs, 'msgs');
				// oneArr = [];
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
				console.log(vm.oneArr, 'oneArr');
				console.log(vm.friends, 'friends');
			});
	}
	}



	}
})();
