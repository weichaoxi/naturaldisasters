var geocoder, map;

function initialize() {
    console.log('iniializing..');
}

function getInfo() {
    console.log('testing this point');
    
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
      zoom: 10,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var loc = document.getElementById('location').value
    console.log('location: ' + loc)
    
    //geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':loc}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });


            $.ajax({
                type: "GET",
                url: "/findrisk",
                data: JSON.stringify({"latitude": results[0].geometry.location.lat(), "longitude": results[0].geometry.location.lng()}),
                contentType: 'application/json',
                dataType: "text",
                success: function(msg) {
                    console.log('success!! ' + msg + " ...!") 
                    //console.log('message: ' + msg);
                    document.getElementById('risk').innerHTML = msg;
                    //var zipCode = msg.location.zip;
                    //getWeather(key, zipCode); //call getWeather function using the parsed zip code
                },
                error: function(jgXHR, textStatus, errorThrown) {
                    alert("Error: " + textStatus + " " + errorThrown);
                }
            });
        } 
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
    
}