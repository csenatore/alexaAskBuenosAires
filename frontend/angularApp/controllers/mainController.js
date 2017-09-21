module.exports = function($scope, $http, $rootScope) {
	var self = this;   
	
	
	$scope.goToHome = function(){
		$location.path("/homeView");

	};

	console.log("main controller"); 
};