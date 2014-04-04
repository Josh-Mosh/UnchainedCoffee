//= require jquery

var map;
var geocoder;
var service;
var infoWindow;
var service;
var markers = [];

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(37.731145,-97.326092)
  };

  map = new google.maps.Map(document.getElementById('map-canvas2'),
      mapOptions);

  infoWindow = new google.maps.InfoWindow({
      content: "title here...", 
      pixelOffset: new google.maps.Size(-25, 0),
      alighBottom: true
    });

  service = new google.maps.places.PlacesService(map);

  var input = (document.getElementById('pac-input'));

  var searchBox = new google.maps.places.SearchBox(input);

  // var address = (document.getElementById('address'));

  var service = new google.maps.places.PlacesService(map);


  function fillInAddress(place) {
  // Get the place details from the autocomplete object.

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
      }
    }
  }

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

     markers = [];
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
      

      var request = {
        reference: place.reference
      };

      var website;
      var pricing;
      var photo;      

      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
            };

      if((place.types.indexOf('food') > -1 || place.types.indexOf('cafe') > -1) && place.name !== 'Starbucks Coffee' && place.name !== 'Starbucks' && place.name !== "Tully's Coffee" && place.name !== "Dunkin' Donuts")
      {
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        address: place.formatted_address,
        latitude: place.geometry.location.k,
        longitude: place.geometry.location.A,
        position: place.geometry.location,
        website: place.website
      });

      
      
      google.maps.event.addListener(marker, 'mouseover', function() {
      	infoWindow.setContent(this.title);
        infoWindow.open(map, this);
      });

      google.maps.event.addListener(marker, 'click', function() {
        console.log(place)
        
        // if pricing is set for place, uses that price 
        if(place.price_level > 0) { this.pricing = place.price_level}
        else { console.log('false')};

        if(place.photos.length > 0) { this.photo = place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 300}); }
        else { this.photo = '';}

        console.log(this.photo)

        var latlng = new google.maps.LatLng(this.latitude, this.longitude);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var place = results[0];
            fillInAddress(place);
          }
        });

        var price;
        if(this.pricing == 1) { price = '$'; }
        else if(this.pricing == 2) { price = '$$'; }
        else if(this.pricing == 3) { price = '$$$'; } 
        else if(this.pricing == 4) { price = '$$$$'; }

         $('.shop_name').val(this.title);
         $('#address').val(this.address);
         $('.shop_website').val(this.website);
         $("input[value='"+price+"']").attr('checked', 'checked')
         $('.photo_prev').show();
         $('.photo_prev').attr('src', this.photo);
         $('.photo_url').val(this.photo);

      });

      markers.push(marker);

       }
       }
      });
      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) 
    {
      map.setCenter(results[0].geometry.location);
      map.setZoom(12);
    } 
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);