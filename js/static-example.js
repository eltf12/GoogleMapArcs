//VARIABLE DECLARATION
var map;
var Map = google.maps.Map,
  LatLng = google.maps.LatLng,
  LatLngBounds = google.maps.LatLngBounds,
  Marker = google.maps.Marker;

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
/*
  var localMarker = new CustomArc({
    pointA: new google.maps.LatLng(-25.2744,133.7751),
    pointB: new google.maps.LatLng(1.3521,103.8198),
    duration: 5000,
    glowColor: 'rgba(0,0,0,0)',
    curve: 0.5,
    mode: 'none',
    map: map
  });

  var localMarker1 = new CustomArc({
    pointA: new google.maps.LatLng(37.0902,-95.7129),
    pointB: new google.maps.LatLng(40.4637,-3.7492),
    duration: 5000,
    lineColor: '#000000',
    curve: 0.2,
    mode: 'fly',
    map: map
  });

  var localMarker2 = new CustomArc({
    pointA: new google.maps.LatLng(-14.2350,-51.9253),
    pointB: new google.maps.LatLng(20.5937,78.9629),
    duration: 5000,
    lineColor: '#fff983',
    glowColor: '#0085ff',
    mode: 'fade',
    map: map
  });
  */

  var localMarker3 = new CustomArc({
    pointA: new google.maps.LatLng(-30.5595,22.9375),
    pointB: new google.maps.LatLng(51.9194,19.1451),
    duration: 5000,
    lineColor: '#fff983',
    glowColor: '#0085ff',
    mode: 'none',
    map: map
  });
}

//****************************************************************************
// INITIALIZATION
//****************************************************************************

google.maps.event.addDomListener(window, 'load', initialize);
