(function() {
	'use strict';
	angular.module('app')
	.factory('JobsFactory', JobsFactory);


	function JobsFactory($http, $q) {
		var o = {};
		o.getJobById = function(id){
			var q =$q.defer();
			$http.get('/api/jobs/' + id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.getJobByCanlendar = function(c,jobID){
			var q=$q.defer();
			$http.put('/api/jobs/confirm/', {jobID: jobID}).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.completeJob = function(c){
			var q=$q.defer();
			$http.put('/api/jobs/complete/' + c).then(function(res){
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
		o.calendarPosts = function(id){
			var q =$q.defer();
			$http.get('/api/jobs/calendar/' + id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.getJobsByCat = function(cat){
			var q = $q.defer();
			$http.get('/api/jobs/search/' + cat).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.sendMsg = function(msg) {
			var q = $q.defer();
			$http.post('/api/msg/send', msg).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.getMessagesById = function() {
			var q = $q.defer();
			$http.get('/api/msg').then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.createJobs = function(job){
			var q  = $q.defer();
			$http.post('/api/jobs', job).then(function(){
				q.resolve();
			});
			return q.promise;
		};
		o.deleteJob = function(id) {
			var q = $q.defer();
			$http.delete('/api/jobs/' + id).then(function(res) {
				q.resolve();
			});
			return q.promise;
		};
		o.updateJob = function(z, id) {
			var q = $q.defer();
			$http.put('/api/jobs/' + id.id, z).then(function (res) {
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.applyJob = function(a, id) {
			var q = $q.defer();
			$http.put('/api/jobs/apply/' + id.id, a).then(function (res) {
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.getApplicants = function(id){
			var q =$q.defer();
			$http.get('/api/app/' + id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.deleteApplicant = function(jobID, appID) {
			var q = $q.defer();
			$http.put('/api/jobs/apply', {jobID: jobID, appID: appID}).then(function(res) {
				q.resolve();
			});
			return q.promise;
		};
		o.chooseApplicant = function(a, stateParamsId){
			var userIdToPush = a.applicant;
			var q = $q.defer();
			$http.put('/api/jobs/choose/', {userIdToPush, stateParamsId}).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.appDecline = function(c, jobId){
			var q =$q.defer();
			$http.put('/api/jobs/accept', {c, jobId}).then(function(res){
				q.resolve();
			});
			return q.promise;
		};
		o.jobCompleted = function(b){
			var q  =$q.defer();
			$http.post('/api/jobs/dashboard',b).then(function(){
				q.resolve();
			});
			return q.promise;
		};

		return o;
	}
})();
