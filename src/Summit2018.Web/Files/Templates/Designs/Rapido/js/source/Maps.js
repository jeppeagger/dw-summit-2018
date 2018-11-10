// Multiple Markers
var markersArray = new Array();

var Maps = function () { }

Maps.prototype.Init = function (containerId, locationsList, markerCallback, selectionCallback, buttonText) {
    if (document.getElementById(containerId) && !document.getElementById(containerId).hasAttribute('data-initialized')) {
        if (locationsList.length > 0) {
            var map;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                mapTypeId: 'roadmap'
            };

            // Display a map on the page
            map = new google.maps.Map(document.getElementById(containerId), mapOptions);
            map.setTilt(45);

            var markers = new Array();
            var infoWindowContent = [];

            for (var i = 0; i < locationsList.length; i++) {
                var latitude = locationsList[i].latitude != null ? locationsList[i].latitude.replace(",", ".") : "";
                var longitude = locationsList[i].longitude != null ? locationsList[i].longitude.replace(",", ".") : "";
                var locationArray = [locationsList[i].company, latitude, longitude];
                var locationCallback = selectionCallback ? '<button class="btn btn--primary dw-mod" onclick="' + selectionCallback + '()">' + buttonText + '</button>' : "";
                var locationDetails = locationsList[i].address ? '<p>' + locationsList[i].address + '</p>' + '<p>' + locationsList[i].zip + ' ' + locationsList[i].city + ' ' + locationsList[i].country + locationsList[i].description + '</p>' : "<p>" + locationsList[i].description + "</p>";
                var locationInfo = ['<div class="map-container__canvas__location-info">' + '<h5>' + locationsList[i].company + '</h5>' + locationDetails + locationCallback + '</div>'];
                markers.push(locationArray);
                infoWindowContent.push(locationInfo);
            }

            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(), marker, i;

            //Make it possible to use the geocoder to look up addresses
            var geocoder = new google.maps.Geocoder();

            // Loop through our array of markers & place each one on the map
            for (i = 0; i < markers.length; i++) {
                var position;

                if (latitude == "") {
                    var address = locationsList[i].address + ", " + locationsList[i].city + ", " + "Denmark";
                    var title = markers[i][0]

                    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status == 'OK') {
                            position = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());

                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                title: title
                            });

                            // Allow each marker to have an info window
                            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                                return function () {
                                    infoWindow.setContent(infoWindowContent[i][0]);
                                    infoWindow.open(map, marker);

                                    if (markerCallback) {
                                        markerCallback(locationsList[i]);
                                    }

                                    var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': locationsList[i] } });
                                    document.dispatchEvent(event);
                                    this.dispatchEvent(event);
                                }
                            })(marker, i));

                            markersArray.push(marker);
                            bounds.extend(position);

                            map.fitBounds(bounds);
                        } else {
                            console.log('Geocode was not successful for the following reason: ' + status);
                        } 
                    });
                } else {
                    position = new google.maps.LatLng(markers[i][1], markers[i][2]);

                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: title
                    });

                    // Allow each marker to have an info window
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infoWindow.setContent(infoWindowContent[i][0]);
                            infoWindow.open(map, marker);

                            if (markerCallback) {
                                markerCallback(locationsList[i]);
                            }

                            var event = new CustomEvent('mapMarkerOnClick', { 'detail': { 'data': locationsList[i] } });
                            document.dispatchEvent(event);
                            this.dispatchEvent(event);
                        }
                    })(marker, i));

                    markersArray.push(marker);
                    bounds.extend(position);

                    map.fitBounds(bounds);
                }
            }

            // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                if (markers.length == 1) {
                    map.setZoom(10);
                }

                google.maps.event.removeListener(boundsListener);
            });

            document.getElementById(containerId).setAttribute("data-initialized", "True");
        }
    }
}

Maps.prototype.OpenInfo = function (markerId) {
    google.maps.event.trigger(markersArray[markerId], 'click');

    var event = new CustomEvent('mapOpenInfo', { 'detail': { 'markerId': markerId } });
    document.dispatchEvent(event);
}

var Maps = new Maps();
