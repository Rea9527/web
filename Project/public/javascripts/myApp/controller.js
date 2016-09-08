// controllers


function indexCtrl($scope, $location, $http) {
	$http.get('/api/homeworks').
		success(function(data, status, headers, config) {
			$scope.homeworks = data.homeworks;
			$location.path('/myAchievements');
		});
}

function readCtrl($scope, $location, $http, $routeParams) {
	$scope.comments = [];
	$scope.TAcomment;
	$scope.TA = true;
	$http.get('/api/read/'+$routeParams.homeworkId).
		success(function(data) {
			$scope.comments = data.comments;
			$scope.TAcomment = data.TAcomment;
		});
}

function readOthersCtrl($scope, $location, $http, $routeParams) {
	$scope.homeworks = [];
	$http.get('/api/readOthers/'+$routeParams.homeworkId)
		.success(function(data) {
			$scope.homeworks = data.homeworks;
		});
}

function judgeCtrl($scope, $location, $http, $routeParams) {
	$scope.TAcomment = {};
	$scope.comments = [];
	$http.get('/api/judge/'+$routeParams.homeworkId+'/'+$routeParams.username)
		.success(function(data) {
			$scope.homework = data.homework;
			$scope.TAcomment = data.homework.TAcomment;
			$scope.comments = data.homework.comments;
			var username = data.user.username;
			if (username == 'teacher') $scope.link = 'teacher';
			else if (username == 'ta') $scope.link = 'ta';
		});
	$scope.submit = function() {
		$http.post('/api/judgeSubmit/'+$routeParams.homeworkId+'/'+$routeParams.username, $scope.TAcomment)
		.success(function(data) {
			$location.path('/judge/'+$routeParams.homeworkId+'/'+$routeParams.username);
		});
	}
}

function userCommentCtrl($scope, $location, $http, $routeParams) {
	$scope.comment = {};
	$http.get('/api/userComment/'+$routeParams.homeworkId+'/'+$routeParams.username)
		.success(function(data) {
			$scope.comment = data.comment[0];
		});
	$scope.submit = function() {
		console.log("comment.content:", $scope.comment.content);
		$http.post('/api/commentSubmit/'+$routeParams.homeworkId+'/'+$routeParams.username, $scope.comment)
			.success(function(data) {
				console.log("submit success!");
			});
	}
}

function submitCtrl($scope, $location, $http, $routeParams) {
	console.log($routeParams.homeworkId);
	$scope.homeworkId = $routeParams.homeworkId;
}

function fileSubmitCtrl($scope, $location, $http) {

}

function taCtrl($scope, $location, $http) {
	$scope.homeworks = [];
	$http.get('/api/ta').
		success(function(data) {
			$scope.homeworks = data.homeworks;
		});
}

function rankCtrl($scope, $location, $http, $routeParams) {
	$scope.homeworks = [];
	$http.get('/api/rank/'+$routeParams.homeworkId)
		.success(function(data) {
			$scope.homeworks = data.homeworks;
		});
}

function viewCtrl($scope, $location, $http, $routeParams) {
	$scope.homeworks = [];
	$http.get('/api/view/'+$routeParams.homeworkId)
		.success(function(data) {
			$scope.homeworks = data.homeworks;
		});
}

function homeworkCtrl($scope, $location, $http) {
	$scope.homework = {};
	$scope.assign = function() {
		$http.post('/api/assign', $scope.homework).
			success(function(data) {
				if (data.username == 'TA') $location.path('/ta');
				else if (data.username = 'Teacher') $location.path('/teacher');
			});
	}
}