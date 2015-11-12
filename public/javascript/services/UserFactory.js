(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);
	function UserFactory($http, $q) {
		var o = {};
		o.status = {};
		var token = '';

    o.registerUser = function(user) {
      var q = $q.defer();
      $http.post('/api/reset/register', user).then(function(res) {
				//setToken(res.data);
        //setUser();
        q.resolve(res.data);
      });
      return q.promise;
    };


    o.loginUser = function(user) {
      var q = $q.defer();
      $http.post('/api/users/login', user).then(function(res) {
        setToken(res.data);
        setUser();
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.logout = function() {
      removeToken();
      removeUser();
    };

    function setUser() {
      var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
      o.status.username = user.username;
      o.status._id = user._id;
			o.status.id = user._id;
    }

    function removeUser() {
      o.status.username = null;
      o.status._id = null;
    }

    function getToken() {
      return localStorage.getItem('token');
    }

    function setToken(token) {
      return localStorage.setItem('token', token);
    }

    function removeToken() {
      return localStorage.removeItem('token');
    }

		function urlBase64Decode(token) {
       // token = getToken();
       if(token ===  undefined){
         // return false;
         console.log("token is undefined");
         return;
       }
       else {
       var output = token.replace(/-/g, '+').replace(/_/g, '/');
       switch (output.length % 4) {
         case 0:
           {
             break;
           }
         case 2:
           {
             output += '==';
             break;
           }
         case 3:
           {
             output += '=';
             break;
           }
         default:
           {
             throw 'Illegal base64url string!';
           }
       }

       return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
     }
     }

		if (getToken()) setUser();

		o.getAllByUser = function(id) {
			var q = $q.defer();
			$http.get('/api/users/dashboard/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		function getAuth() {
		var auth = {
		headers: {
			Authorization: "Bearer " +
			localStorage.getItem("token")
			}
		};
		return auth ;
		}

		o.forgot = function(user) {
		var q = $q.defer() ;
			$http.post('/api/reset/forgot', user).success(function(res) {
				q.resolve() ;
			});
		return q.promise ;
			};

		o.resetPassword = function(editedUser) {
    var q = $q.defer() ;
    $http.put('/api/reset/resetPassword/' , editedUser).success(
      function(res) {
        q.resolve(res) ;
      }) ;
    return q.promise ;
  	};


		return o;
	}
})();
