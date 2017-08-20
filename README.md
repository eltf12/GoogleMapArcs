# Animate Arcs on Google Map
This is a simple example of how to implement animated arcs into Google Map connecting point A to B.

## GoogleMapArcs made to be **_Easy_** to work with
To add an arc, simply call:
```javascript
var Marker = new CustomArc({
  pointA: new google.maps.LatLng(-25.2744,133.7751),
  pointB: new google.maps.LatLng(1.3521,103.8198),
  map: map
});
```

## Arcs are also **_Customizable_**
- Change the duration of the animation with the `duration` attribute. _Default value is `2500`_
```javascript
var localMarker = new CustomArc({
  pointA: new google.maps.LatLng(-25.2744,133.7751),
  pointB: new google.maps.LatLng(1.3521,103.8198),
  duration: 5000, //in milliseconds
  map: map
});
```

- Change the color of the line with the `lineColor` attribute. _Default value is `#ffffff`_
```javascript
var localMarker = new CustomArc({
  pointA: new google.maps.LatLng(-25.2744,133.7751),
  pointB: new google.maps.LatLng(1.3521,103.8198),
  lineColor: '#fff',
  map: map
});
```

- Change the glow of the line with the `glowColor` attribute. _Note: to remove the glow, you can set the value of the color as `rgba(0,0,0,0)`. Default value is `rgb(0,186,255)`_
```javascript
var localMarker = new CustomArc({
  pointA: new google.maps.LatLng(-25.2744,133.7751),
  pointB: new google.maps.LatLng(1.3521,103.8198),
  glowColor: '#00ffff',
  map: map
});
```

- Change the curvature of the arc with the `curve` attribute. _Note: the curve works best for values 0.5 or less. Default value is 0.5_
```javascript
var localMarker = new CustomArc({
  pointA: new google.maps.LatLng(-25.2744,133.7751),
  pointB: new google.maps.LatLng(1.3521,103.8198),
  curve: 0.5,
  map: map
});
```

- Change the type of animation with the `mode` attribute. Choose between `fade`, `fly` or `none`. _Default value is `fade`._
```javascript
var localMarker = new CustomArc({
  pointA: new google.maps.LatLng(-25.2744,133.7751),
  pointB: new google.maps.LatLng(1.3521,103.8198),
  mode: 'none',
  map: map
});
```
_Animation description:_
`fade` - draws an arc which then fades off after it has been drawn
`fly` - draws an arc which flies through
`none` - draws a persistent arc

### Mix and match attributes to create your desired arc
An example
```javascript
var localMarker = new CustomArc({
  pointA: new google.maps.LatLng(-25.2744,133.7751),
  pointB: new google.maps.LatLng(1.3521,103.8198),
  lineColor: '#000000',
  glowColor: '#00ffff',
  curve: 0.5,
  mode: 'none',
  map: map
});
```

## Examples
Run this folder in a localhost http server to see the arcs in action:
`static-example.html` - features 3 types of animated arcs
`live-example.html` - continuous drawing of random arcs

## Requirement
- a valid Google Map API key, [*get one its free anyway*](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Snap SVG library](http://snapsvg.io/)

You will need to add the following to the `<head>` of your html file:
```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=geometry,places&amp;ext=.js"></script>
<script type="text/javascript" charset="UTF-8" src="https://oss.maxcdn.com/libs/snapsvg/0.1.0/snap.svg-min.js"></script>
<script type="text/javascript" charset="UTF-8" src="js/arclib.js"></script>
```

Then make the appropriate map declarations in your javascript:
```javascript
var map;
var Map = google.maps.Map,
  LatLng = google.maps.LatLng,
  LatLngBounds = google.maps.LatLngBounds,
  Marker = google.maps.Marker;
```

And declare your Google Map bounds:
```javascript
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
```

And you are all set to generate your arcs!
