import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
//import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const mapContainer = useRef(null);
  const map = useRef(null);

  // TODO: set lat/long to project region (use Google places API first)
  const [long, setLong] = useState(7.9589027);
  const [lat, setLat] = useState(47.8200179);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
      if (!map.current) initializeMap();
  }, [])

  console.log("map container: ", mapContainer);

  function initializeMap() {
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: [long, lat],
        zoom:zoom
    })
  }

  return <div ref={mapContainer} className="position-relative my-5"></div>;
}
