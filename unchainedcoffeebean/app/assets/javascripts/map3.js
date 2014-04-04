console.log(gon.shopInfo)
var map

function initialize() {
  
  var latitude = gon.shopAddress.latitude
  var longitude = gon.shopAddress.longitude
  var infowindow = new google.maps.InfoWindow({
      content: "<div class=info_window'><h5>"+gon.shopInfo.name+"</h5></div>"
    });

  var myLatlng = new google.maps.LatLng(latitude,longitude);

  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(latitude, longitude)
  };

  map = new google.maps.Map(document.getElementById('map-canvas3'),
      mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map
    });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


