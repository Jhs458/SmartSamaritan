(function() {
	'use strict';
	angular.module('app')
	.controller('ServicesController', ServicesController);

	function ServicesController(UserFactory, JobsFactory, $stateParams, $mdSidenav, $state) {
		var vm = this;

		vm.viewAllCat = function(){
			$state.go("JobsView", {cat: "allCategeories"});
		};
		vm.viewMechanical = function(){
			$state.go("JobsView", {cat: "mechanical"});
		};
		vm.viewElectrical = function(){
			$state.go("JobsView", {cat: "electronic"});
		};
		vm.viewPets = function(){
			$state.go("JobsView", {cat: "pets"});
		};
		vm.viewPhysicalLabor = function(){
			$state.go("JobsView", {cat: "physicalLabor"});
		};
		vm.viewMisc = function(){
			$state.go("JobsView", {cat: "misc"});
		};

  }
})();
