# Tripz

## Summary

  Tripz is designed help you navigate through cities.  Using the Geosearch you are tied to no single city, but can jump to where you'd like.  You can add markers by clicking the map, starting a route and drag the markers to different points or erase them one-by-one if need be.  There are also directions if you need them, if not, turn them off.  Hope you enjoy.

## Technologies used

* Mapbox API
* Leaflet
  * Leaflet Routing Machine
  * Geocoding
* Bootstrap  

## The Why and Approach

  I really wanted to experiment with Mapbox and Leaflet.  To get my feet wet I decided to have a simple MVP: being able to search a city and route a course that you would then give you the distance.  I started off with a bunch of ajax calls to the OpenCage API to set up my map and get my markers, but it became increasingly bogged down with code and seemed I was making it far too complicated.  So I dove into the Leaflet docs and really spent some time reading and experimenting with what they had to offer and came up with simple solutions to what I wanted to achieve for my MVP.

## Next Iteration

  * I would like the route to be more walkable.  Right now the route is determined by car directions, and does not make the most sense for someone who does not have to obey the rules of the road.  

  * Have a user login and persist routes to a database.  
