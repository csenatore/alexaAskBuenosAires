module.exports = function($scope, $http, $mdDialog, $location, $http, $interval) {
	//const url = 'http://localhost:8000/';
	const url = 'http://34.208.148.159:8000/';

	$scope.datetime = '';

	$scope.initMap = function(){
      	var mapProp = { 
	        center: new google.maps.LatLng(-34.60475, -58.432829),
	        zoom: 12,
	        zoomControl: true,
	        zoomControlOptions: {
	          position: google.maps.ControlPosition.RIGHT_BOTTOM
	        },
	        mapTypeControl: false,
	        scaleControl: true, 
	        fullscreenControl: true,
	        streetViewControl: true,
	        streetViewControlOptions: {
	          position: google.maps.ControlPosition.RIGHT_BOTTOM
	        },
        };  
        
      	$scope.googleMap = new google.maps.Map(document.getElementById("map"), mapProp);
      	$scope.googleMap.setOptions({ minZoom: 3, maxZoom: 18 });
      	
      	//para realizar la visualizacion de la ruta
    	$scope.directionsDisplay = new google.maps.DirectionsRenderer({
    		draggable: false,
    		panel: document.getElementById('right-panel'),
    		map: $scope.googleMap
    	});
    	$scope.directionsService = new google.maps.DirectionsService;
    	$scope.markersArray = [];
	}

	//muestra un marcador con la direccion actual de alexa
	$scope.myLocation = function(lat, lng){
		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(lat, lng),
		    title:"Estoy aqui, Alexa",
		    map: $scope.googleMap
		});
		$scope.markersArray.push(marker);
	}

	//seteando marcador de la direccion indicadorcada
	$scope.setMarkerInLocation = function(lat, lng){
		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(lat, lng),
		    map: $scope.googleMap
		});
		$scope.markersArray.push(marker);
	}

	//muestra la ruta entre dos posiciones indicadorcadas
	$scope.calcRoute = function (startLat, startLng, endLat, endLng) {
	  $scope.directionsService.route({
	    origin: new google.maps.LatLng(startLat, startLng),
	    destination: new google.maps.LatLng(endLat, endLng), 
	    travelMode:'WALKING'
	  }, function(response, status) {
	    if (status == 'OK') {
	      $scope.directionsDisplay.setDirections(response);
	    }
	  });
	}

	$scope.setPlaces = function(){
		$http.get(url + 'getPlaces').then(function(response){
			var labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			var places = response.data;
			$scope.labels = labels;
			$scope.places = places;
			for (var n = 0; n < places.length; n++) {
	    		var marker = new google.maps.Marker({
				    position: new google.maps.LatLng(places[n].lat, places[n].lng),
				    label: labels[n],
				    map: $scope.googleMap
				});
	    		//self.createInfoWindow(marker, $scope.ordenesVerificador[n], verificadorId);
	    		$scope.markersArray.push(marker);
	    	}
		});
	}

	//obtiene los datos de la tabla mysql
	$scope.getGoogleApiInfo = function(){
		$http.get(url + 'getMode').then(function(response){

			var data = response.data;
			

			if($scope.datetime < data.datetime){
				$scope.datetime = data.datetime;

	    		$scope.deleteMarkerFromMap(); 	   		
	    		
	    		switch(data.mode){
		    		case 'myLocation':
		    			$scope.myLocation(data.startLat, data.startLng);
		    			$scope.class = 'col-lg-12 col-md-12 col-sm-12';
		    			$scope.card ='';
		    			$scope.indicador = false;
		    		break;
		    		
		    		case 'directions':
		    			$scope.calcRoute(data.startLat, data.startLng, data.endLat, data.endLng);	
		    			$scope.class = 'col-lg-8 col-md-8 col-sm-8';
						$scope.card ='col-lg-4 col-md-4 col-sm-4';
		    			$scope.indicador = true;	
		    			$scope.title = 'Indicaciones'
		    			break;
		    		
		    		case 'geocode':
		    			$scope.setMarkerInLocation(data.startLat, data.startLng);
		    			$scope.class = 'col-lg-12 col-md-12 col-sm-12';
		    			$scope.card ='';
		    			$scope.indicador = false;
		    			break;

		    		case 'places':
		    			$scope.setPlaces();
		    			$scope.class = 'col-lg-8 col-md-8 col-sm-8';
						$scope.card ='col-lg-4 col-md-4 col-sm-4';
						$scope.indicador = true;
						$scope.title = 'Información adicional'
		    			break;

		    		case 'placesAutocomplete':
		    			$scope.setPlaces();
		    			$scope.class = 'col-lg-8 col-md-8 col-sm-8';
						$scope.card ='col-lg-4 col-md-4 col-sm-4';
						$scope.indicador = true;
						$scope.title = 'Información adicional'
		    			break;

		    		default:
		    			break;
		    	}
			}
		}); 
	}

	//borrando los marcadores que estan puestos
    $scope.deleteMarkerFromMap = function(){
    	for (var h = 0; h < $scope.markersArray.length; h++) {
        	$scope.markersArray[h].setMap(null);
        }
		$scope.directionsDisplay.setDirections({routes: []});
    }

	$scope.initMap();
	$interval($scope.getGoogleApiInfo, 5000);
}