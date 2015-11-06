(function() {
  "use strict";
  angular.module('app')
  .factory('AuthInterceptor', AuthInterceptor);
  function AuthInterceptor($window) {
    var o = {
      request: function(config) {
        if($window.localStorage.getItem('token')) {
          config.headers.authorization = "Bearer " + $window.localStorage.getItem('token');
        }
        return config;
      }
    };

    return o;
  }
})();
