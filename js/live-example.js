//VARIABLE DECLARATION
var map;
var Map = google.maps.Map,
  LatLng = google.maps.LatLng,
  LatLngBounds = google.maps.LatLngBounds,
  Marker = google.maps.Marker;

//RANDOM FUNCTIONS
function randomMode(){
  var selectedNumber = Math.round(Math.random()*3);

  if(selectedNumber == 1 || selectedNumber == 0){
    return 'fade';
  }
  else if (selectedNumber == 2) {
    return 'fly';
  }
  else{
    return 'none';
  }
}

function randomCurve(){
  return 0.5 * Math.random();
}

function randomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function randomLocation(){
  var randomPointer = Math.round(Math.random() * countrylatlng.length);
  return countrylatlng[randomPointer];
}


//INITIALIZATION FUNCTION
function initialize(){

  //DECLARE MAP BOUNDARIES
  var bounds = new LatLngBounds();
  bounds.extend(new google.maps.LatLng(-70,-80));
  bounds.extend(new google.maps.LatLng(70,100));

  //GENERATE MAP
  map = new Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(0, 60),
    zoom: 12
  });

  //FIT MAP TO BOUNDARIES
  map.fitBounds(bounds);

  setInterval(function(){
    var randomNumberOfLines = Math.round(Math.random() * 10); //between 1 - 10

    for(var x = 1; x <= randomNumberOfLines; x++){
      var randomLocation1 = randomLocation();
      var randomLocation2 = randomLocation();
      var randomMarker = new CustomArc({
        pointA: new google.maps.LatLng(randomLocation1[0],randomLocation1[1]),
        pointB: new google.maps.LatLng(randomLocation2[0],randomLocation2[1]),
        duration: 5000,
        lineColor: randomColor(),
        glowColor: randomColor(),
        curve: randomCurve(),
        mode: 'fade',
        map: map
      });

    }
  },6000);

}

//****************************************************************************
// INITIALIZATION
//****************************************************************************

google.maps.event.addDomListener(window, 'load', initialize);
