var app = angular.module('myApp', ['ngRoute', 'ngLocalize']);
app.config(function ($routeProvider) {
	$routeProvider
    .when('/home', {
      controller:'HomeController',
      templateUrl:'templates/home.html'
    })
    .when('/users', {
      controller:'UserListController',
      templateUrl:'templates/users.html'
    })
    .otherwise({
      redirectTo:'/'
    });
});

app.controller('HomeController', function ($scope, $http, $window) {
	var lang = $window.navigator.userLanguage || $window.navigator.language;
    // $scope.langParam = '';
    lang.indexOf('-') > -1 ? $scope.langParam = lang.substring(0, lang.indexOf('-')) : $scope.langParam = lang;
	$http.get("http://127.0.0.1:8080?lang=" + $scope.langParam)
    	.success(function(result) {
    		console.log(result);
    });
});


app.controller('UserListController', function ($scope, $http, $timeout, locale) {
	$scope.isEdit = false; //is create

	$http.get("http://127.0.0.1:8080/users?lang=" + $scope.langParam)
    	.success(function(result) {
	    	console.log(result.message);
	    	alertify.success(locale.getString("users.getUserListSuccessfully"));
	    	$scope.users = result.result;
    });

    $scope.submit = function () {
    	var jsonData = {};

    	if ($scope.isEdit) {
			jsonData = {id: $scope.user.id, name: $scope.user.name, major: $scope.user.major, dob: $scope.user.dob, gender: $scope.user.gender};
			$http.put("http://127.0.0.1:8080/edit-user?lang=" + $scope.langParam, jsonData, {headers: {'Content-Type': 'application/json'}})
			    .success(function(result) {
			    	console.log(result.message);
			    	alertify.success(locale.getString("users.updateUserSuccessfully").replace('{0}', $scope.user.name));
			    	$scope.users = result.result;
			    	
			    	$timeout(function () {
			    		$scope.resetForm();
			    	});
	    	});	

    	} else {
			jsonData = {name: $scope.user.name, major: $scope.user.major, dob: $scope.user.dob, gender: $scope.user.gender};
			$http.post("http://127.0.0.1:8080/add-user?lang=" + $scope.langParam, jsonData, {headers: {'Content-Type': 'application/json'}})
		    	.success(function(result) {
			    	console.log(result.message);
			    	alertify.success(locale.getString("users.createUserSuccessfully").replace('{0}', $scope.user.name));
			    	$scope.users = result.result;
			    	
			    	$timeout(function () {
			    		$scope.resetForm();
			    	});
	    	});	   		
    	}
    	
	};

	$scope.edit = function (user) {
		$scope.user = user;
		$scope.isEdit = true;
		$('#name').focus();
	};

	$scope.delete = function (user) {
		var usrName = user.name;
		alertify.confirm(locale.getString("users.confirmDeleteUser"), function (e) {
			if (e) {
				var jsonData = {id: user.id};
				$http.post("http://127.0.0.1:8080/delete-user?lang=" + $scope.langParam, jsonData, {headers: {'Content-Type': 'application/json'}})
		    	.success(function(result) {
			    	console.log(result.message);
			    	alertify.success(locale.getString("users.deleteUserSuccessfully").replace('{0}', usrName));
			    	$scope.users = result.result;
			    	
			    	$timeout(function () {
			    		$scope.resetForm();
			    	});
	    		});	
			}
			else{

			}
		})
	};

	$scope.resetForm = function () {
		$scope.user = {};
	};

	$scope.cancel = function () {
		$scope.resetForm();
	}
});
