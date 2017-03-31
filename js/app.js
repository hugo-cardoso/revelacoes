var app = angular.module('reveal', ["firebase","angularMoment"]);

app.controller('appController', function($scope, $firebaseArray) {

	if(navigator.onLine){

		$scope.reveals = $firebaseArray(firebase.database().ref().child("reveals"));

		$scope.reveals.$loaded().then(function(x) {
			$scope.revealsOk = true;
		})

	}else{
		$scope.offline = true;
	}

	$scope.addReveal = function(reveal){

		var date = String(moment());

		console.log(date)

		$scope.reveals.$add({
			"reveal": reveal,
			"date": date
		});

	}
	
});