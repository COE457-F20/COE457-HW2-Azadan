var destinationCoords = null;
var currentCoords = null;

var map;
var dir;

var currentLayer;
var currentMarker, destMarker;


window.onload = function () {
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [38.895345, -77.030101],
        zoom: 10
    });

    dir = MQ.routing.directions();

    map.locate({
        setView: true,
        maxZoom: 10,
        watch: true
    });


    map.on('locationfound', function (e) { 
        
        if (currentMarker == null){
            currentMarker = new L.Marker(e.latlng);
            currentMarker.bindPopup("Current Location").openPopup();
            map.addLayer(currentMarker);
        }
        else{
            currentMarker.setLatLng(e.latlng);
        }

        currentCoords = e.latlng;
        if (destinationCoords != null){
            updateRoute();
        }
        
    });

    map.on('click', function (e) {
        //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)

        destinationCoords = e.latlng;

        if (destMarker == null){
            destMarker = new L.Marker(e.latlng);
            destMarker.bindPopup("Destination").openPopup();
            map.addLayer(destMarker);
        }
        else{
            destMarker.setLatLng(e.latlng);
        }

        updateRoute();
    });
}

function updateRoute() {
    if (currentLayer != null && map.hasLayer(currentLayer)) {
        map.removeLayer(currentLayer);
    }
    dir.route({
        locations: [
            { latLng: currentCoords },
            { latLng: destinationCoords }
        ]
    });
    currentLayer = MQ.routing.routeLayer({
        directions: dir,
        fitBounds: true
    });
    map.addLayer(currentLayer);
    $.post("http://localhost:8080",
        JSON.stringify({
            coords_starting: currentCoords,
            coords_destination: destinationCoords,
        }), null);
}



