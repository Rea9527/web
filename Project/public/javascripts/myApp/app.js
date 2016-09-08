'use strict';

angular.module('myApp', []).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/myAchievements', {
				templateUrl: '/index/partials/index',
				controller: indexCtrl
			}).
			when('/ta', {
				templateUrl: '/index/partials/ta',
				controller: taCtrl
			}).
			when('/teacher', {
				templateUrl: '/index/partials/ta',
				controller: taCtrl
			}).
			when('/submit/:homeworkId', {
				templateUrl: '/index/partials/submit',
				controller: submitCtrl
			}).
			when('/files/uploadFiles/:homeworkId', {
				templateUrl: '/index/partials/submitSuccess',
				controller: fileSubmitCtrl
			}).
			when('/read/:homeworkId', {
				templateUrl: '/index/partials/read',
				controller: readCtrl
			}).
			when('/readOthers/:homeworkId', {
				templateUrl: '/index/partials/readOthers',
				controller: readOthersCtrl
			}).
			when('/rank/:homeworkId', {
				templateUrl: '/index/partials/rank',
				controller: rankCtrl
			}).
			when('/view/:homeworkId', {
				templateUrl: '/index/partials/view',
				controller: viewCtrl
			}).
			when('/judge/:homeworkId/:username', {
				templateUrl: '/index/partials/judge',
				controller: judgeCtrl
			}).
			when('/userComment/:homeworkId/:username', {
				templateUrl: '/index/partials/userComment',
				controller: userCommentCtrl
			}).
			when('/homework', {
				templateUrl: '/index/partials/homework',
				controller: homeworkCtrl
			}).
			otherwise({
				redirectTo: '/myAchievements'
			});

		$locationProvider.html5Mode(true);
	}]);