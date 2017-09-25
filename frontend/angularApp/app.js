require('angular');
require('angular-sanitize');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-google-chart');
 
var app = angular.module('app', [ 'ngMaterial', 'ui.router', 'googlechart']);
 
/*config*/
var config = require('./config');
app.config(config);

/*services*/

/*factories*/

/*directives*/


/*controllers*/
var mainController = require('./controllers/mainController');
var homeController = require('./controllers/homeController');
app.controller('mainController', ['$scope', '$http', '$rootScope', '$location', mainController]);
app.controller('homeController', ['$scope', '$http','$mdDialog', '$location', '$http','$interval', homeController]);

