var map = L.map('map').setView([38.8949549, -77.0366455], 15);

L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 18,
  // Replace the below properties with your `Map ID` and `Default Public Token` values you saved earlier, respectively.
  id: 'rhinoman333.pd891lgo',
  accessToken:'pk.eyJ1Ijoicmhpbm9tYW4zMzMiLCJhIjoiY2lscGxieGMxMDhqeHRya25vYjR4YXUycCJ9.Cj2wGJWi6IbEi1dkOWLWEA'
}).addTo(map);

var control = L.Routing.control({
  waypoints: [null],
  routeWhileDragging: true
}).addTo(map);

var points = new Array;
map.on("click", function( event ){
  var lng_lat = new L.LatLng(event.latlng.lat, event.latlng.lng);
  var marker = new L.Routing.Waypoint(lng_lat);
  points.push(marker);
  control.setWaypoints(points);
});

$(".remove").on("click", function(e){
  points.splice(points.length - 1, 1);
  control.setWaypoints(points);
});

$(".distanceGet").on("click", function(e){
  var meters = control._routes[0].summary.totalDistance;
  var miles = meters * 0.000621371192;
  $("#distanceSum").val('');
  $("#distanceSum").text(miles.toFixed(2)+" miles");
  // alert(miles.toFixed(2));
});

$(".directions").on("click",function(){
  $("div.leaflet-routing-container").toggle();
});

new L.Control.GeoSearch({
  provider: new L.GeoSearch.Provider.Google(),
  showMarker: false,
  retainZoomLevel: false,
}).addTo(map);
