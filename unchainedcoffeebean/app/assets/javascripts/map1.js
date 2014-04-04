
var geocoder;
var map;
var infowindow = null;
var markers = [];

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(37.731145,-97.326092);
  var mapOptions = {
    
    zoom: 4,
    center: latlng
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  google.maps.event.addListener(map, 'idle', function() {
    
    clearMarkers();
    shown_markers = [];

    var northeast = map.getBounds().getNorthEast();
    var southwest = map.getBounds().getSouthWest();

    // console.log("northeast: ", northeast)
    // console.log("southwest: ", southwest)

    $('.north').attr("value", northeast.k);
    $('.south').attr("value", southwest.k);
    $('.east').attr("value", northeast.A);
    $('.west').attr("value", southwest.A);

    addMarkerArray(northeast, southwest);

    $('#maprefresh').submit();
  });
}


var getShopInfo = function()
{
  for(var i=0; i< shown_markers.length; i++)
  {
    // $('.shops').html(shown_markers[i].name);
  }
}

var shown_markers = [];

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function addMarkerArray(ne, sw)
{ 
  var infowindow = new google.maps.InfoWindow({
      content: "holding..."
    });

  for(var i = 0; i < gon.addresses.length; i++)
  {
    var latitude = gon.addresses[i].latitude;
    var longitude = gon.addresses[i].longitude;
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    
    if(latitude < ne.k && latitude > sw.k && longitude < ne.A && longitude >sw.A)
    {
      if(shown_markers.indexOf(gon.shops[i].id) > -1)
      {

      }
      else
      {
        shown_markers.push(gon.shops[i]);
      }

      var shopsite = gon.shops[i].website;
      if(shopsite.substr(0, 4) !== 'http')
      {
        shopsite = "http://" + shopsite;
      }
      
      if(shown_markers.length < 51)
      {
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          info: "<div class=info_window'><h5>"+gon.shops[i].name+"</h5>"+
                "<p>"+gon.addresses[i].address+ "</p>"+
                "<p>"+gon.shops[i].pricing +' - rating </p>'+
                "<a href='"+shopsite+"' target='_blank'>"+shopsite+ "</p></div>"
          });

        markers.push(marker);

        google.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.setContent(this.info);
          infowindow.open(map, this);
        });
      }
    }
  }
}

function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(10);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


// setInterval(initialize,1000);

