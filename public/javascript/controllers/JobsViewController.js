(function() {
	'use strict';
	angular.module('app')
	.controller('JobsViewController', JobsViewController);

	function JobsViewController(JobsFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;

		if($stateParams.cat == "allCategeories"){				//This if statement is necessary to see all catereogies since the url for categeories
			JobsFactory.getJobs().then(function(res){				//requires :cat on the end of it to be identified. Because of which they make
				vm.jobs = res;																	//Seperate calls to the server
			});
		}
		else{
			JobsFactory.getJobsByCat($stateParams.cat).then(function(res){	//gets jobs by catereogy
				vm.jobs = res;
			});
		}


		vm.deleteJob = function(id){
			JobsFactory.deleteJob(id).then(function() {
				if($stateParams.cat == "allCategeories"){		//Instead of forwarding a user to a different state this repopulates the screen
					JobsFactory.getJobs().then(function(res){		//with the new data which is everything minus what was just deleted
						vm.jobs = res;															//Exact same if statement as above
					});
				}
				else{
					JobsFactory.getJobsByCat($stateParams.cat).then(function(res){
						vm.jobs = res;
					});
				}
			});
		};






	}
})();
