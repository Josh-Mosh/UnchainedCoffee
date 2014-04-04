
var map3
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-35.397, 120.644)
  };

  map3 = new google.maps.Map(document.getElementById('map-canvas3'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);


