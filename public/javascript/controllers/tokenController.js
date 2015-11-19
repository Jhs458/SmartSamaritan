(function() {
	'use strict';
	angular.module('app')
	.controller('tokenController', tokenController);

	function tokenController($stateParams, UserFactory, $state) {
    var vm = this;

  var x = $stateParams.token;

  UserFactory.setToken(x)

  UserFactory.setUser(x)

  	$state.go("Services");

	}
})();
