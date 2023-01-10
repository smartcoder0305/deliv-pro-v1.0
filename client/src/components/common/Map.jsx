import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MarkerClusterer from "@googlemaps/markerclustererplus";

import Loading from '../layout/Loading';
import { useRef } from "react";
import { useEffect } from "react";

const REACT_APP_GOOGLE_MAP_API_KEY = 'AIzaSyBGMYzjoRqpTmgGRDT1j016yi8TeyjNGAo';

const render = (status) => {
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <Loading />;
};

function Map(props) {
  return (
    <div className="w-full h-full">
      <Wrapper apiKey={REACT_APP_GOOGLE_MAP_API_KEY} render={render}>
          <MyMapComponent {...props} />
      </Wrapper>
    </div>
  )
}

const MyMapComponent = (props) => {
  const mapRef = useRef(null);
  const { locations, zoom } = props;
  useEffect(() => {
    if(locations.length) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: locations[locations.length-1],
        zoom
      });

      
      if(locations.length >= 2) {
        const directionsService = new window.google.maps.DirectionsService;
        const directionsDisplay = new window.google.maps.DirectionsRenderer({map});
        directionsService.route({
          origin: locations[0],
          destination: locations[locations.length-1],
          avoidTolls: false,
          avoidHighways: false,
          waypoints: locations.slice(1, -1).map((location) => ({location})),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if(status === window.google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        })
      } else {
      const markers = locations.map((location, index) => {
        if(index) {
        }
        return new window.google.maps.Marker({
          position: location,
          label: "A"
        });
      });
    
      new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
      });
      }
    } else {
      new window.google.maps.Map(mapRef.current, {
        center: {lat: 52.52, lng: 13.405},
        zoom
      });
    }
  });

  return <div ref={mapRef} id="map" className={`w-full h-full ${props.className || ""}`}></div>
}

export default React.memo(Map, (prev, next) => {
  return JSON.stringify(prev) === JSON.stringify(next);
});