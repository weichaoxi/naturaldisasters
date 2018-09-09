var geocoder, map;

function initialize() {
    return;
}

function getInfo() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
      zoom: 10,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var loc = document.getElementById('location').value
    console.log('location ' + loc)
    
    //geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':loc}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } 
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
}