module.exports = function($scope, $http, $rootScope, $location) {
	var self = this;   
		
	$scope.goToHome = function(){
		$location.path("/home");

	};

	console.log("main controller"); 
};