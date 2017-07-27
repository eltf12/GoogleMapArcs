//****************************************************************************
// SETTINGS
//****************************************************************************

//UNIQUE ID GENERATOR
function getUniqueId(){
  var ALPHABET = '23456789abdegjkmnpqrvwxyz';
  var ALPHABET_LENGTH = ALPHABET.length;
  var ID_LENGTH = 8;
  var HashID = {};

  HashID.generate = function() {
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET_LENGTH));
    }
    return rtn;
  };

  var uniqueid = HashID.generate();

  return uniqueid;
}

// ARC DECLARATION
CustomArc.prototype = new google.maps.OverlayView();

//ARC OPTIONS
function CustomArc(opts) {
    this.setValues(opts);
}

//ARC DRAWER
CustomArc.prototype.draw = function() {
  Point = google.maps.Point;
  var self = this;
  var div = this.div;

  var lineColor = self.lineColor;
  if(!lineColor) lineColor = '#ffffff';
  var glowColor = self.glowColor;
  if(!glowColor) glowColor = 'rgb(0,186,255)';
  var curve = self.curve;
  if(!curve) curve = 0.5;
  var duration = self.duration;
  if(!duration) duration = 2500;
  var mode = self.mode;
  if(!mode) mode = 'fade';

  if(!div){
    // ARC CREATION
    // Get bound end points
    var point1 = self.getProjection().fromLatLngToDivPixel(self.pointA);
    var point2 = self.getProjection().fromLatLngToDivPixel(self.pointB);

    //Calculate movement direction
    var rotationDirection = '';
    var curveDirection = '';
    var rectPoint = [];
    var maxPoint = [];
    var xyOffset = 20;

    //Sets the size of the SVG box and the x,y positioning

    if(point2.x == point1.x && point2.y < point1.y){
      //console.log('=<');
      rotationDirection = -1;
      curveDirection = -1;
      rectPoint = ['0 - xyOffset','e.y - xyOffset'];
      maxPoint = ['c.x', 'e.y - xyOffset * 5'];
    }
    else if(point2.x < point1.x && point2.y < point1.y){
      //console.log('<<');
      rotationDirection = -1;
      curveDirection = -1;
      rectPoint = ['e.x - xyOffset','c.y - xyOffset'];
      maxPoint = ['- e.x', 'c.y - xyOffset * 5'];
    }
    else if(point2.x < point1.x && point2.y == point1.y){
      //console.log('<=');
      rotationDirection = -1;
      curveDirection = -1;
      rectPoint = ['e.x - xyOffset','c.y - xyOffset'];
      maxPoint = ['- e.x', 'c.y - xyOffset * 5'];
    }
    else if (point2.x < point1.x && point2.y > point1.y){
      //console.log('<>');
      rotationDirection = -1;
      curveDirection = -1;
      rectPoint = ['e.x - xyOffset','0 - xyOffset * 2'];
      maxPoint = ['- e.x', 'e.y'];
    }
    else if (point2.x == point1.x && point2.y > point1.y){
      //console.log('=>');
      rotationDirection = -1;
      curveDirection = 1;
      rectPoint = ['0 - xyOffset','0 - xyOffset'];
      maxPoint = ['c.x', 'e.y'];
    }
    else if (point2.x > point1.x && point2.y > point1.y){
      //console.log('>>');
      rotationDirection = -1;
      curveDirection = 1;
      rectPoint = ['0 - xyOffset','0 - xyOffset * 5'];
      maxPoint = ['e.x', 'e.y + xyOffset * 10'];
    }
    else if (point2.x > point1.x && point2.y == point1.y){
      //console.log('>=');
      rotationDirection = -1;
      curveDirection = 1;
      rectPoint = ['0 - xyOffset','c.y - xyOffset * 5'];
      maxPoint = ['e.x', 'c.y - xyOffset * 10'];
    }
    else if (point2.x > point1.x && point2.y < point1.y){
      //console.log('><');
      rotationDirection = -1;
      curveDirection = 1;
      rectPoint = ['0 - xyOffset','e.y - xyOffset * 5'];
      maxPoint = ['e.x', '- e.y + xyOffset * 10'];
    }
    else if (point2.x == point1.x && point2.y == point1.y){
      //console.log('==');
      rotationDirection = -1;
      curveDirection = 1;
      rectPoint = ['0','0'];
      maxPoint = ['100', '100'];
    }

    var curvature = curveDirection * curve;

    // Calculate the arc
    var e = new Point(point2.x - point1.x, point2.y - point1.y), // endpoint (p2 relative to p1)
      m = new Point(e.x / 2, e.y / 2), // midpoint
      o = new Point(e.y, -e.x), // orthogonal
      c = new Point( // curve control point
        m.x + curvature * o.x,
        m.y + curvature * o.y);
    // Generate the arc path
    var pathDef = 'M 0,0 ' +
      'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;

    if (point2.x == point1.x && point2.y == point1.y){
      pathDef = `M` + (20*curve).toString() + ` ` + (35*curve).toString() + `,0 0,` + (40*curve).toString() + ` 0 z`;
    }

    var maxX = eval(maxPoint[0]);
    var maxY = eval(maxPoint[1]);


    // DIV CREATION
    var currentUniqueId = getUniqueId();
    var innerDiv = document.createElement('div');
      innerDiv.setAttribute('id','myArc-'+currentUniqueId);
      innerDiv.style.background = 'none';
      innerDiv.style.position = 'absolute';
      innerDiv.style.padding = '0';
      innerDiv.style.left = (point1.x + eval(rectPoint[0])) + 'px';
      innerDiv.style.top = (point1.y + eval(rectPoint[1])) + 'px';
      innerDiv.style.zIndex = 999;

      if (point2.x == point1.x && point2.y == point1.y){
        innerDiv.style.left = (point1.x - (10*curve)).toString() + 'px';
        innerDiv.style.top = (point1.y - (17*curve)).toString() + 'px';
      }

    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
     svg.setAttribute('width',Math.abs(maxX + 60));
     svg.setAttribute('height',Math.abs(maxY + 60));
     svg.setAttribute('x','0');
     svg.setAttribute('y','0');
     svg.setAttribute('viewBox', eval(rectPoint[0]).toString() + ' ' + eval(rectPoint[1]).toString() +' ' + Math.abs(maxX + 60).toString() + " " + Math.abs(maxY + 60).toString());
     svg.setAttribute('preserveAspectRatio', "xMinYMin slice");

     var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');

     //Filter for the outside glow
     var filter = document.createElementNS('http://www.w3.org/2000/svg',"filter");
     filter.setAttribute("id","softGlow_"+currentUniqueId);

     var feMorphology = document.createElementNS('http://www.w3.org/2000/svg',"feMorphology");
     feMorphology.setAttribute("operator","dilate");
     feMorphology.setAttribute("radius","4");
     feMorphology.setAttribute("in","SourceAlpha");
     feMorphology.setAttribute("result","thicken");

     filter.appendChild(feMorphology);

     var feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg',"feGaussianBlur");
     //feGaussianBlur.setAttribute("stdDeviation","3.5");
     //feGaussianBlur.setAttribute("result","coloredBlur");
     feGaussianBlur.setAttribute("in","thicken");
     feGaussianBlur.setAttribute("stdDeviation","5");
     feGaussianBlur.setAttribute("result","blurred");

     filter.appendChild(feGaussianBlur);

     var feFlood = document.createElementNS('http://www.w3.org/2000/svg',"feFlood");
     feFlood.setAttribute("flood-color",glowColor);
     feFlood.setAttribute("result",glowColor);

     filter.appendChild(feFlood);

     var feComposite = document.createElementNS('http://www.w3.org/2000/svg',"feComposite");
     feComposite.setAttribute("in",glowColor);
     feComposite.setAttribute("in2","blurred");
     feComposite.setAttribute("operator","in");
     feComposite.setAttribute("result","softGlow_colored");

     filter.appendChild(feComposite);

     var feMerge = document.createElementNS('http://www.w3.org/2000/svg',"feMerge");
     var feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg',"feMergeNode");
     feMergeNode1.setAttribute("in","softGlow_colored");
     var feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg',"feMergeNode");
     feMergeNode2.setAttribute("in","SourceGraphic");
     feMerge.appendChild(feMergeNode1);
     feMerge.appendChild(feMergeNode2);

     filter.appendChild(feMerge);

     defs.appendChild(filter);
     svg.appendChild(defs);

      var snapB = Snap(svg);

      // SVG B - "Squiggly" Path
      var myPathB = snapB.path(pathDef).attr({
        id: "squiggle",
        strokeMiterLimit: "10",
        "filter":"url(#softGlow_"+currentUniqueId+")"
      });

      // SVG B - Draw Path
      var lenB = myPathB.getTotalLength();

      //Set number of rotations for line animation
      var modeMultiple;
      if(mode == 'fade') {modeMultiple = 1;}
      else if(mode == 'fly') {modeMultiple = 2;}
      else{modeMultiple = 1;}

      // SVG B - Animate Path
      myPathB.attr({
        stroke: lineColor,
        strokeWidth: 2,
        fill: 'none',
        // Draw Path
        "stroke-dasharray": "0 " + lenB + " " + lenB + " 0",
        "stroke-dashoffset": -lenB
      }).animate({"stroke-dashoffset": rotationDirection * lenB * modeMultiple}, duration, mina.easeinout);

      innerDiv.appendChild(svg);
      this.div_ = innerDiv;

      var panes = this.getPanes();
      panes.overlayLayer.appendChild(innerDiv);

      //Clear reference
      delete innerDiv;
      delete lenB;
      delete myPathB;
      delete snapB;
      delete feMergeNode2;
      delete feMergeNode1;
      delete feMergeNode;
      delete feMerge;
      delete feComposite;
      delete feFlood;
      delete feGaussianBlur;
      delete feMorphology;
      delete filter;
      delete defs;
      delete svg;
      delete this.div_;

      // Removal logic: line using mode 'none' will not be removed
      if(mode == 'fade'){
        setTimeout(function(){
          var runOnceSwitch = true;
          var opacity = 1;
          var opacityDiff = 100/ (duration * 0.5);
          var fadeInterval = setInterval(function(){
            opacity = opacity - opacityDiff;
            myPathB.attr({'opacity': String(opacity)});
            if(opacity <= 0) {
              clearInterval(fadeInterval);
            }
          },100);

          setTimeout(function(){
            var findDivtoRemove = document.getElementById('myArc-'+currentUniqueId);
            panes.overlayLayer.removeChild(findDivtoRemove);
          },duration*1.1);

        }, duration);

      }else if(mode == 'fly'){
        setTimeout(function(){
          var findDivtoRemove = document.getElementById('myArc-'+currentUniqueId);
          panes.overlayLayer.removeChild(findDivtoRemove);
        }, duration);
      }
    }
};
