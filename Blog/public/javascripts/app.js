'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: 'blog/partials/index',
        controller: IndexCtrl
      }).
      when('/Blog/index', {
        templateUrl: 'blog/partials/index',
        controller: IndexCtrl
      }).
      when('/myPosts', {
        templateUrl: 'blog/partials/myPost',
        controller: myPostsCtrl
      }).
      when('/addPost', {
        templateUrl: 'blog/partials/addPost',
        controller: AddPostCtrl
      }).
      when('/admin/readPost/:id', {
        templateUrl: 'blog/partials/admin',
        controller: ReadPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'blog/partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'blog/partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'blog/partials/deletePost',
        controller: DeletePostCtrl
      }).
      otherwise({
        redirectTo: '/Blog/index'
      });
    $locationProvider.html5Mode(true);
  }]);