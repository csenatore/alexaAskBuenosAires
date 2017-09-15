module.exports = function($stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {
	
	$urlRouterProvider.otherwise("/home"); //redireccion a una pagina por defecto
	
	$stateProvider.state('/home', {
		url : "/home",
		templateUrl : "views/homeView.html",
	});

	//$httpProvider.interceptors.push('errorInterceptorFactory');

	//formateo de la fecha del datepicker a DD-MM-YYYY
	$mdDateLocaleProvider.formatDate = function(date) {
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };

    
};