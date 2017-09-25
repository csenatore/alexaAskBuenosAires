module.exports = function($scope, $http, $mdDialog, $location, $http, $interval) {
	//const url = 'http://localhost:8000/';
	const url = 'http://34.208.148.159:8000/';

	$scope.datetime = '';
	$scope.showResponse = false;

	$scope.initMap = function(){
      	var mapProp = { 
	        center: new google.maps.LatLng(-34.60605694664254, -58.381502248290985),//new google.maps.LatLng(-34.60475, -58.432829), 
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
	$scope.myLocation = function(lat, lng, name, address){
		self.setMarker(lat, lng, name, address, '');
	}

	//seteando marcador de la direccion indicadorcada
	$scope.setMarkerInLocation = function(lat, lng, name, address){		
		self.setMarker(lat, lng, name, address, '');
	}

	//muestra la ruta entre dos posiciones indicadorcadas
	$scope.calcRoute = function (startLat, startLng, startName, startAddress, endLat, endLng, endName, endAddress) {

		self.setMarker(startLat, startLng, startName, startAddress, 'images/start.png');
		self.setMarker(endLat, endLng, endName, endAddress, 'images/finish.png');

		$scope.directionsService.route({
		    origin: new google.maps.LatLng(startLat, startLng),
		    destination: new google.maps.LatLng(endLat, endLng), 
		    travelMode:'WALKING'
		}, function(response, status) {
		    if (status == 'OK') {
		      $scope.directionsDisplay.setDirections(response);
		      $scope.directionsDisplay.setOptions({draggable: false, suppressInfoWindows: false, suppressMarkers: true});
		    }
		});
	}

	$scope.setPlaces = function(){
		$http.get(url + 'getPlaces').then(function(response){
			var labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			var places = response.data;
			var currentInfoWindow = null;
			$scope.labels = labels;
			$scope.places = places;
			
			for (var n = 0; n < places.length; n++) {
	    		var marker = new google.maps.Marker({
				    position: new google.maps.LatLng(places[n].lat, places[n].lng),
				    label: labels[n],
				    map: $scope.googleMap
				});

				marker.infowindow = new google.maps.InfoWindow({
		            content: '<div>'+
				    			'<h3>' + places[n].name + '</h3>'+
				    			'<p><img src="images/location.png"/> ' + places[n].address + '</p>'+
				    		'</div>'
		        });

		        google.maps.event.addListener(marker, 'click', function(){
		            if (currentInfoWindow != null) { 
				        currentInfoWindow.close(); 
				    } 
				    this.infowindow.open($scope.googleMap, this);
				    currentInfoWindow = this.infowindow; 
		        });
	    		$scope.markersArray.push(marker);
	    	}
		});
	}

	self.setMarker = function(lat, lng, name, address, icon){
		var infowindow = new google.maps.InfoWindow({
		    content: '<div>'+
		    			'<h3>' + name + '</h3>'+
		    			'<p>Ubicación: ' + address + '</p>'+
		    		'</div>'
		});
		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(lat, lng),
		    title:name,
		    icon: icon,
		    map: $scope.googleMap
		});
		marker.addListener('click', function() {
		    infowindow.open($scope.googleMap, marker);
		});
		$scope.markersArray.push(marker);
	}

	//obtiene los datos de la tabla mysql
	$scope.getGoogleApiInfo = function(){
		$http.get(url + 'getMode').then(function(response){

			var data = response.data;
			

			if($scope.datetime < data.datetime){
				$scope.datetime = data.datetime;
				$scope.respuestaAlexa = data.respuesta;
				$scope.showResponse = true;

	    		$scope.deleteMarkerFromMap(); 	   		
	    		
	    		switch(data.mode){
		    		case 'myLocation':
		    			$scope.myLocation(data.startLat, data.startLng, data.name_start, data.address_start);
		    			$scope.class = 'col-lg-12 col-md-12 col-sm-12';
		    			$scope.card ='';
		    			$scope.aditionalInfo = false;
		    		break;
		    		
		    		case 'directions':
		    			$scope.calcRoute(data.startLat, data.startLng, data.name_start, data.address_start, data.endLat, data.endLng, data.name_end, data.address_end);	
		    			$scope.class = 'col-lg-8 col-md-8 col-sm-8';
						$scope.card ='col-lg-4 col-md-4 col-sm-4';
		    			$scope.aditionalInfo = true;	
		    			$scope.indications = true;
		    			$scope.title = 'Indicaciones'
		    			break;
		    		
		    		case 'geocode':
		    			$scope.setMarkerInLocation(data.startLat, data.startLng, data.name_start, data.address_start);
		    			$scope.class = 'col-lg-12 col-md-12 col-sm-12';
		    			$scope.card ='';
		    			$scope.aditionalInfo = false;
		    			break;

		    		case 'placesAutocomplete':
		    			$scope.setPlaces();
		    			$scope.class = 'col-lg-8 col-md-8 col-sm-8';
						$scope.card ='col-lg-4 col-md-4 col-sm-4';
						$scope.aditionalInfo = true;
						$scope.indications = false;
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