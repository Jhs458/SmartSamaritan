(function() {
	'use strict';
	angular.module('app')
	.controller('DashboardController', DashboardController);
	function DashboardController($stateParams, UserFactory, $state, $scope) {
		var vm = this;
		vm.status = UserFactory.status;

		UserFactory.getAllByUser(vm.status._id).then(function(res){
			vm.userArray = res;
			// console.log(vm.userArray, 'userArray');
		});

		vm.goToJob = function(id){
			$state.go('JobDetails', {id:id}, {location: true});
		};

		UserFactory.getUserInfo($stateParams.id).then(function(res){
			vm.userInfo = res;
			console.log(vm.userInfo, 'userInfo');
		});

//image upload
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
				// var filename = blob.filename;
				var url = blob.url;
				// var id = blob.id;
				// var isWriteable = blob.isWriteable;
				// var mimetype = blob.mimetype;
				// var size = blob.size;


				console.log("after picking");
				// window.location.reload();

			UserFactory.sendpPic(blob,vm.status._id).then(function(res){
				// vm.getUserInformation();
				UserFactory.getUserInfo($stateParams.id).then(function(res){
					vm.userInfo = res;
					// console.log(vm.userInfo);
				});
			});
	});
};

vm.infoEdit = function(i){
			// console.log(i, 'infoEdit');
			UserFactory.infoEdit(i, vm.status._id).then(function(res){
				UserFactory.getUserInfo($stateParams.id).then(function(res){
					vm.userInfo = res;
				});
			});
}



	}
})();
