'use strict';


/* Controllers */

function IndexCtrl($scope, $http, $location) {
  $http.get('/api/posts').
    success(function(posts, status, headers, config) {
      $scope.posts = posts.posts;
      $location.path('/Blog/index');
    });

  $scope.isAdmin = function() {
    $http.get('/api/isAdmin').
      success(function(data) {
        console.log(data);
        $scope.checkAdmin = data;
      });
  }
  $scope.isAdmin();
}

function myPostsCtrl($scope, $http, $location) {
  $http.get('/api/myPosts').
    success(function(posts, status, headers, config) {
      $scope.posts = posts.posts;
      $location.path('/myPosts');
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.url('/Blog/index');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams, $location) {
  $scope.comments = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      console.log(data.post);
      $scope.post = data.post;
    });
  $scope.submitComment = function() {
    $http.post('/api/comment/'+$routeParams.id, $scope.comments).
      success(function(data) {
        data.isMyComment = true;
        $scope.post.comments.push(data);
      });
  }
  $scope.deleteComment = function(comment) {
    $http.post('/api/deleteComment/'+$routeParams.id, comment).
      success(function(data) {
        var comments = [];
        comments.push(comment);
        $scope.post.comments = _.difference($scope.post.comments, comments);
      });
  }

  $scope.editComment = function(comment) {
    $scope.deleteComment(comment);
    $scope.comments = comment;
  }

  $scope.hideComment = function(comment) {
    var index = _.findIndex($scope.post.comments, function(o) {
      return o == comment;
    });
    $http.post('/api/hideComment/'+$routeParams.id, comment).
      success(function(data) {
        $scope.post.comments[index].isHide = true;
      });
  }

  $scope.showComment = function(comment) {
    var index = _.findIndex($scope.post.comments, function(o) {
      return o == comment;
    });
    $http.post('/api/showComment/'+$routeParams.id, comment).
      success(function(data) {
        console.log("success?");
        $scope.post.comments[index].isHide = false;
      });
  }

  $scope.hidePost = function() {
    $http.get('/api/hidePost/'+$routeParams.id).
      success(function(data) {
        console.log("success?");
        $scope.post.text = data.text;
        $scope.post.hide = true;
      });
  }
  $scope.showPost = function() {
    $http.get('/api/showPost/'+$routeParams.id).
      success(function(data) {
        $scope.post.text = data.text;
        $scope.post.hide = false;
      });
  }
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    console.log("edit?");
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        console.log("success?");
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/Blog/index');
      });
  };

  $scope.home = function () {
    $location.url('/myPosts');
  };
}
