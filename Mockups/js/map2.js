
var map2
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 140.644)
  };

  map2 = new google.maps.Map(document.getElementById('map-canvas2'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);


