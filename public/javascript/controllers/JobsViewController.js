(function() {
	'use strict';
	angular.module('app')
	.controller('JobsViewController', JobsViewController);

	function JobsViewController(JobsFactory, $mdSidenav, $state, $stateParams) {
		var vm = this;

		if($stateParams.cat == "allCategeories"){				//This if statement is necessary to see all catereogies since the url for categeories
			JobsFactory.getJobs().then(function(res){				//requires :cat on the end of it to be identified. Because of which they make
				vm.jobs = res;
				console.log(res);															//Seperate calls to the server
			});
		}
		else{
			JobsFactory.getJobsByCat($stateParams.cat).then(function(res){	//gets jobs by catereogy
				vm.jobs = res;
			});
		}

vm.isApplicant =  function(applicants, userID) {
	for(var i = 0; i < applicants.length; i++) {
		return applicants[i].applicant === userID; 
	}
};

//Google map
		vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

		var events = {
          places_changed: function (searchBox) {
						var place = searchBox.getPlaces();

						if(!place || place == "undefined" || place.length === 0){
							return;
						}

						//console.log(place[0].geometry.location.lat());

						vm.map = {
							 center: {
							latitude: place[0].geometry.location.lat(),
							longitude: place[0].geometry.location.lng()
						}, zoom:12

					};

//Marker
				// 	vm.marker = {
				// 						latitude: place[0].geometry.location.lat(),
				// 						longitude: place[0].geometry.location.lng(),
				// };

				vm.markers = [
					{
										latitude: place[0].geometry.location.lat(),
										longitude: place[0].geometry.location.lng(),
				},
        ['London Eye, London', 51.503454,-0.119562],
        ['Palace of Westminster, London', 51.499633,-0.124755]
    ];

		function initializeMaps() {
			var myOptions = {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false
			};
			var map = new google.maps.Map(document.getElementById("map"),myOptions);
			var infowindow = new google.maps.InfoWindow();
			var marker, i;
			var bounds = new google.maps.LatLngBounds();

			for (i = 0; i < markers.length; i++) {
				var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
				bounds.extend(pos);
				marker = new google.maps.Marker({
					position: pos,
					map: map
				});
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.setContent(markers[i][0]);
						infowindow.open(map, marker);
					};
				})(marker, i));
			}
			map.fitBounds(bounds);
		}





//Circle
				vm.options = {scrollwheel:false};
				vm.circles = [
            {
                id: 1,
                center: {
                    latitude:  place[0].geometry.location.lat(),
                    longitude: place[0].geometry.location.lng()
                },
                radius: 10000,
                stroke: {
                    color: '#08B21F',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#08B21F',
                    opacity: 0.5
                },
                geodesic: true, // optional: defaults to false
                draggable: true, // optional: defaults to false
                clickable: true, // optional: defaults to true
                editable: true, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            }
        ];

		// 		var createRandomMarker = function(i, bounds, idKey) {
    //   var lat_min = bounds.southwest.latitude,
    //     lat_range = bounds.northeast.latitude - lat_min,
    //     lng_min = bounds.southwest.longitude,
    //     lng_range = bounds.northeast.longitude - lng_min;
		//
    //   if (idKey === null) {
    //     idKey = "id";
    //   }
		//
    //   var latitude = lat_min + (Math.random() * lat_range);
    //   var longitude = lng_min + (Math.random() * lng_range);
    //   var ret = {
    //     latitude: latitude,
    //     longitude: longitude,
    //     title: 'm' + i
    //   };
    //   ret[idKey] = i;
    //   return ret;
    // };
		// vm.randomMarkers=[];



				}
			};



        vm.searchbox = {template:'searchbox.tpl.html', events:events};

	}

})();
