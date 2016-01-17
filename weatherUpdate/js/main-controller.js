// document.addEventListener('DOMContentLoaded', function () {
// 	// body...
// 	var button1 = document.getElementById('getCordinates');
// 	button1.addEventListener('click', function() {

// 		console.log('button clicked');
// 		if (navigator.geolocation) {
// 	        navigator.geolocation.getCurrentPosition(function(position) {
// 		    	console.log("latitude=" + position.coords.latitude + ", longitude=" + position.coords.longitude);
// 			});
// 	    } else {
// 	        alert('geolocation not supported by this browser');
// 	    }

// 	})
// })

var module = angular.module('weatherUpdate',[]);
module.controller('maincontroller',['$scope','$http','$timeout', function($scope,$http, $timeout){
	$scope.data = '';
	function setPosition (position) {
    	console.log("latitude*****=" + position.coords.latitude + ", longitude=*****" + position.coords.longitude);
    	$scope.lat = position.coords.latitude;
    	$scope.longi = position.coords.longitude;
    	$scope.$apply();
    	$http({
		  method: 'GET',
		  url: 'http://api.openweathermap.org/data/2.5/weather?lat='+$scope.lat+'&lon='+$scope.longi+'&appid=2de143494c0b295cca9337e1e96b00e0'
		}).then(function successCallback(response) {
			$scope.data = response.data;
			$scope.area = $scope.data.name;
			console.log($scope.data);
			$scope.description = $scope.data.weather[0].description;
			$scope.descriptionImage = $scope.data.weather[0].icon;
			$scope.humidity = $scope.data.main.humidity;
			$scope.minTem = ($scope.data.main.temp_min - 273.15).toFixed(2) + 'C'; 
			$scope.maxTem = ($scope.data.main.temp_max - 273.15).toFixed(2) + 'C';

			var utcSeconds = $scope.data.sys.sunrise;
			var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
			d.setUTCSeconds(utcSeconds);
			$scope.sunRise = d.toLocaleTimeString();
			utcSeconds = $scope.data.sys.sunset;
			d = new Date(0);
			d.setUTCSeconds(utcSeconds); 
			$scope.sunSet =  d.toLocaleTimeString();
			utcSeconds = $scope.data.dt;
			d = new Date(0);
			d.setUTCSeconds(utcSeconds);
			$scope.date = d.toDateString();
		    // this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	$timeout(function(){
        if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(setPosition);
	    } else {
	        alert('geolocation not supported by this browser');
	    }
    });
}]);