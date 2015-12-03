(function() {
	'use strict';
	angular.module('app')
	.controller('LeaderboardController', LeaderboardController);

	function LeaderboardController(UserFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;
    vm.status = UserFactory.status;
		
    UserFactory.getAllUser().then(function(res){
				vm.leaderboardPosts = res;
			});

	}
})();
