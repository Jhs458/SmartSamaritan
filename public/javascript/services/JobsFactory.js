(function() {
	'use strict';
	angular.module('app')
	.factory('JobsFactory', JobsFactory);


	function JobsFactory($http, $q) {
		var o = {};


		o.getJobById = function(id){
			var q =$q.defer();
			console.log(id);
			$http.get('/api/jobs/' + id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.getJobs = function(){
			var q = $q.defer();
			$http.get('/api/jobs').then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};


		o.createJobs = function(job){
			console.log(job);
			var q  = $q.defer();
			$http.post('/api/jobs',job).then(function(){
				q.resolve();
			});
			return q.promise;
		};




		return o;
	}
})();
