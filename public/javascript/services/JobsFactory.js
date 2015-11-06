(function() {
	'use strict';
	angular.module('app')
	.factory('JobsFactory', JobsFactory);


	function JobsFactory($http, $q) {
		var o = {};

		o.sendMsg = function(msg) {
      var q = $q.defer();
      $http.post('/api/msg/send', msg).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

		o.getAllMessages = function() {
			var q = $q.defer();
			$http.get('/api/msg').then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};



		return o;
	}
})();
