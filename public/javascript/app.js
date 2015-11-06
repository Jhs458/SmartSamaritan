(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider
		.state('Dashboard',{
			url: '/',
			templateUrl: 'views/dashboard.html'
		})
		.state('Services',{
			url: '/services',
			templateUrl: 'views/services.html'
		})
		.state('JobDetails',{
			url: '/jobdetails/:id',
			templateUrl: 'views/jobDetails.html'
		})
		.state('CreateJob',{
			url: '/createjob',
			templateUrl: 'views/createJob.html'
		})
		.state('Calendar',{
			url: '/calendar',
			templateUrl: 'views/calendar.html'
		})
		.state('JobsView',{
			url: '/jobsview',
			templateUrl: 'views/jobsView.html'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('AuthInterceptor');
	}
})();
