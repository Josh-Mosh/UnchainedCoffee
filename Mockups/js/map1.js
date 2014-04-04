var map
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(47.614848, -122.3358422)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);