'use strict';

angular.module('adminApp', []).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/admin', {
				templateUrl: '/admin/partials/index',
				controller: indexCtrl
			}).
			when('/addUser', {
				templateUrl: '/admin/partials/addUser',
				controller: addUserCtrl
			}).
			when('/deleteUser', {
				templateUrl: '/admin/partials/deleteUser',
				controller: deleteUserCtrl
			}).
			otherwise({
				redirectTo: '/admin'
			});

		$locationProvider.html5Mode(true);
	}]);