

function indexCtrl($scope, $location, $http) {
	$scope.users = [];
	$http.get('/adminApi/users')
		.success(function(data, status, headers, config) {
			$scope.users = data.users;
		});

	$scope.deleteUser = function(user) {
		$http.post('/adminApi/deleteUser', user).
			success(function(data) {
				$location.path('/index');
			});
	}
}


function addUserCtrl($scope, $location, $http) {
	$scope.user = {};
	$scope.msg = "";

	$scope.addUser = function() {
		$http.post('/adminApi/addUser', $scope.user).
			success(function(data) {
				$scope.msg = data;
				console.log("add:"+$scope.msg);
				$scope.user = {};
			});
	}
}

function deleteUserCtrl($scope, $location, $http) {
	$scope.user = {};
	$scope.msg = "";

	$scope.deleteUser = function() {
		$http.post('/adminApi/deleteUser', $scope.user).
			success(function(data) {
				$scope.msg = data;
				console.log("delete:"+$scope.msg);
				if ($scope.msg == "删除成功！") $scope.user = {};
			});
	}
}