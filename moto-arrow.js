var timer;

function startTimer(){
    timer = setInterval(fetchCoords, 3000);
}

function fetchCoords() {
    $.get("http://localhost:8080", function (data) {
        currentCoords = JSON.parse(data);
        var currAngle = (90 + Math.round(getAngle(currentCoords.coords_destination,currentCoords.coords_starting)))%360;
        $("#fake_arrow").text(currAngle);
        $("#arrow").css("transform", "rotate("+Math.round(currAngle)+"deg)");
    });
}

function getAngle(start_coord, end_coord) {
    startLat = toRadians(start_coord.latitude);
    startLng = toRadians(start_coord.longitude);
    destLat = toRadians(end_coord.latitude);
    destLng = toRadians(end_coord.longitude);

    y = Math.sin(destLng - startLng) * Math.cos(destLat);
    x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
};

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

