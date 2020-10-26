var destinationCoords = null;
var startCoords = null;

window.onload = function () {

    var map;
    var dir;

    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [38.895345, -77.030101],
        zoom: 15
    });

    dir = MQ.routing.directions();

    var currentLayer;
    var startMarker, destMarker;

    map.on('click', function (e) {
        //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        if (startCoords == null) {
            startCoords = {
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
            };
            startMarker = new L.Marker(e.latlng);
            map.addLayer(startMarker);
            startMarker.bindPopup("Start").openPopup();
        }
        else {
            if (destinationCoords == null) {
                destinationCoords = {
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng
                };
                destMarker = new L.Marker(e.latlng);
                map.addLayer(destMarker);
                destMarker.bindPopup("Destination").openPopup();
            }
            else {
                if (startMarker != null && map.hasLayer(startMarker)){
                    map.removeLayer(startMarker);
                }
                if (destMarker != null && map.hasLayer(destMarker)){
                    map.removeLayer(destMarker);
                }
                //Update start pos
                startCoords = {
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng
                };
            }
            if (currentLayer != null && map.hasLayer(currentLayer)){
                map.removeLayer(currentLayer);
            }
            dir.route({
                locations: [
                    { latLng: { lat: startCoords.latitude, lng: startCoords.longitude } },
                    { latLng: { lat: destinationCoords.latitude, lng: destinationCoords.longitude } }
                ]
            });
            currentLayer = MQ.routing.routeLayer({
                directions: dir,
                fitBounds: true
            });
            map.addLayer(currentLayer);


            $.post("http://localhost:8080",
                JSON.stringify({
                    coords_starting: startCoords,
                    coords_destination: destinationCoords,
                }), null);
        }


    });
}