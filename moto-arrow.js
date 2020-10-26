var timer;

function startTimer() {
    timer = setInterval(fetchCoords, 3000);
}

function fetchCoords() {
    //Note, this is the temporary laptop ip address for phone testing
    // $.get("http://192.168.0.178:8080", function (data) {
    $.get("http://localhost:8080", function (data) {
        currentCoords = JSON.parse(data);
        var currAngle = (90 + Math.round(getAngle(currentCoords.coords_destination, currentCoords.coords_starting))) % 360;
        $("#arrow").css("transform", "rotate(" + Math.round(currAngle) + "deg)");
    });
}

function getAngle(start_coord, end_coord) {
    startLat = toRadians(start_coord.lat);
    startLng = toRadians(start_coord.lng);
    destLat = toRadians(end_coord.lat);
    destLng = toRadians(end_coord.lng);

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

