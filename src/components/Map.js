import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
//import "mapbox-gl/dist/mapbox-gl.css";

export default function Map(props) {
  
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  
  const { className, clickable, projectId } = props;
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
        style: process.env.REACT_APP_MAPBOX_STYLE,
        center: [long, lat],
        zoom:zoom
    })
  }

  return clickable ? 
    <Link ref={mapContainer} className={className} to={`/home/projects/${projectId}/map`} /> :
    <div ref={mapContainer} className={className}></div>;
}
