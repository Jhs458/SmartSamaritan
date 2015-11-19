(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial', 'ngPasswordStrength', 'uiGmapgoogle-maps', 'angular-jwt'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider
		.state('Dashboard',{
			url: '/dashboard/:id',
			templateUrl: 'views/dashboard.html'
		})
		.state('Splash',{
			url: '/splash',
			templateUrl: 'views/splash.html'
		})
		.state('Services',{
			url: '/',
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
			url: '/jobsview/:cat',
			templateUrl: 'views/jobsView.html'
		})
		.state('PassReset',{
			url: '/passreset/:info',
			templateUrl: 'views/passReset.html'
		})
		.state('Oauth',{
			url: '/auth/token/:token',
			templateUrl: 'views/token.html'
		})
		.state('Leaderboard',{
			url:'/leaderboard',
			templateUrl:'views/leaderboard.html'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('AuthInterceptor');
	}
})();
