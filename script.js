var polylinePoints = [];
var map;
  $("input[name='submitCity']").on("click", function(event){
    event.preventDefault();
    var city = $("input[name='city']").val();
    var url = "http://api.opencagedata.com/geocode/v1/json?query="+city+"&pretty=1&key=40e44097eea08858ac218fa05cc288a9";
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);
      $("#map").css("display","block");
      var lat = response.results[0].geometry.lat,
          lng = response.results[0].geometry.lng;
      map = L.map('map').setView([lat,lng], 15);
      L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18,
          // Replace the below properties with your `Map ID` and `Default Public Token` values you saved earlier, respectively.
          id: 'rhinoman333.pd891lgo',
          accessToken: 'pk.eyJ1Ijoicmhpbm9tYW4zMzMiLCJhIjoiY2lscGxieGMxMDhqeHRya25vYjR4YXUycCJ9.Cj2wGJWi6IbEi1dkOWLWEA'
      }).addTo(map);

      map.on( "click", function( event ){
        var lng_lat = new L.LatLng(event.latlng.lat,event.latlng.lng);
        L.marker(lng_lat).addTo( map ).bindPopup(
            "<p>Latitude: "+event.latlng.lat+" Longitude: "+event.latlng.lng+"</p>"
        );
        polylinePoints.push(lng_lat);
        makePath();
      });

      $(".city").css("display","none");
      $(".landmark").css("display","block");
    }).fail(function(){
      console.log("request failed")
    }).always(function(){
      console.log("yeah, it ran")
    })
  });


//  new ajax call for landmark
$("input[name='submitLandmark']").on("click", function(event){
  event.preventDefault();
  var landmark = $("input[name='landmark']").val();
  var url = "http://api.opencagedata.com/geocode/v1/json?query="+landmark+"&pretty=1&key=40e44097eea08858ac218fa05cc288a9";
  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    console.log(response);
    var lat = response.results[0].geometry.lat,
        lng = response.results[0].geometry.lng;
        var lng_lat = new L.LatLng(lat,lng);
    L.marker(lng_lat).addTo( map ).bindPopup(
      "<p>Latitude: "+lat+" Longitude: "+lng+"</p>");
    polylinePoints.push(lng_lat);
    makePath();
    $("input[type='text']").val('');
  }).fail(function(){
    console.log("request failed")
  }).always(function(){
    console.log("yeah, it ran")
  })
});

var polylineOptions = {
      color: 'lightblue',
      weight: 6,
      opacity: 0.9
    };
var polyline;

function makePath(){
  if(polylinePoints.length >= 2) {
    polyline = new L.Polyline(polylinePoints, polylineOptions);
  }
};

var sum = 0;
function kmConverter(km){
  km = parseFloat(km);
  var miles = km * .6;
  sum += miles;
  $("#distance").val(sum)
};

// Adding prototype for measuring polygons
/*
 * Extends L.Polyline to retrieve measured distance.
 *
 * https://github.com/danimt/Leaflet.PolylineMeasuredDistance
 */

L.Polyline.prototype.measuredDistance = function (options) {
  // Default options
  this.defaults = {
    metric: true
  };
  // Extend options
  this.options = L.extend(this.defaults, options);

  var distance = 0,  coords = null, coordsArray = this._latlngs;

  for (i = 0; i < coordsArray.length - 1; i++) {
    coords = coordsArray[i];
    distance += coords.distanceTo(coordsArray[i + 1]);
  }

  // Return formatted distance
  return L.PolylineUtil.readableDistance(distance, this.options.metric);
};

L.PolylineUtil = {
  readableDistance: function (distance, isMetric) {
    var distanceStr;

    if (isMetric) {
      // show metres when distance is < 1km, then show km
      if (distance > 1000) {
        distanceStr = (distance  / 1000).toFixed(2) + ' km';
      } else {
        distanceStr = Math.ceil(distance) + ' m';
      }
    } else {
      distance *= 1.09361;

      if (distance > 1760) {
        distanceStr = (distance / 1760).toFixed(2) + ' miles';
      } else {
        distanceStr = Math.ceil(distance) + ' yd';
      }
    }

    return distanceStr;
  }
};
