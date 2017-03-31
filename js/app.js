var app = angular.module('reveal', ["firebase","angularMoment"]);

app.controller('appController', function($scope, $firebaseArray, $timeout) {

	$scope.reveals = $firebaseArray(firebase.database().ref().child("reveals"));

	$scope.reveals.$loaded().then(function(x) {
		$scope.revealsOk = true;
	})

	$scope.noSpam = function(){

		$scope.postLock = true;

		$timeout(function(){

			$scope.postLock = false;

		}, 5 * 60000)

	}

	$scope.addReveal = function(reveal){

		var date = String(moment());

		if(reveal){

			$scope.reveals.$add({
				"reveal": reveal,
				"date": date
			});

			$scope.reveal = "";

			$scope.noSpam();

		}

	}

	$scope.comment = function(key,comment){

		$scope.comments = $firebaseArray(firebase.database().ref().child("reveals/" + key + "/comments"));

		$scope.comments.$add({
			"comment": comment
		});

		$scope.input.comment = "";

	}
	
});