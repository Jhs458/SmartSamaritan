(function() {
	'use strict';
	angular.module('app')
	.controller('DashboardController', DashboardController);
	function DashboardController($stateParams, UserFactory, $state, $scope) {
		var vm = this;
		vm.status = UserFactory.status;

		UserFactory.getAllByUser(vm.status._id).then(function(res){
			vm.userArray = res;
		});

		vm.goToJob = function(id){
			$state.go('JobDetails', {id:id}, {location: true});
		};



//image upload
console.log("dashcontroller");
vm.pic = function(){
		filepicker.setKey("AVkaqvPVuQCCSH059S4zQz");

		filepicker.pick({
				mimetype: 'image/*', /* Images only */
				maxSize: 1024 * 1024 * 5, /* 5mb */
				imageMax: [1500, 1500], /* 1500x1500px */
				cropRatio: 1/1, /* Perfect squares */
				services: ['*'] /* All available third-parties */
		}, function(blob){
				// Returned Stuff
				var filename = blob.filename;
				var url = blob.url;
				var id = blob.id;
				var isWriteable = blob.isWriteable;
				var mimetype = blob.mimetype;
				var size = blob.size;

				console.log("after picking");

			UserFactory.sendpPic(blob,vm.status._id).then(function(res){
				console.log(blob, vm.status._id);
				console.log(res + "res");
				vm.user.photo =res;
				console.log(vm.user.photo +"vm.users2");

			});

	});
};



	}
})();
