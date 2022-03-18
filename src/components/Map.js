import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import airspaceLayer from "../data/openaip-airspaces.json";
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
  }, []);

  map.current?.on("load", () => {
    addAirspaceLayer(map.current);
  });

  function initializeMap() {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_MAPBOX_STYLE,
      center: [long, lat],
      zoom: zoom,
    });
  }

  function addAirspaceLayer(map) {
    // filter for flight restriction zones that apply to heights < 100m
    const filteredAirspaces = JSON.parse(JSON.stringify(airspaceLayer));
    filteredAirspaces.features = airspaceLayer.features.filter(
      (feature) =>
        feature.properties.lowerLimit?.unit === 1 &&
        feature.properties.lowerLimit.value <= 328
    );
    console.log(filteredAirspaces);

    map.addSource("airspaces", {
      type: "geojson",
      data: filteredAirspaces,
    });
    // there seems to be a filter expression here too
    map.addLayer({
      id: "openaip-airspaces",
      type: "fill",
      source: "airspaces",
      paint: {
        "fill-color": "#d53118",
        "fill-opacity": 0.3
      },
    });
  }

  return clickable ? (
    <Link
      ref={mapContainer}
      className={className}
      to={`/home/projects/${projectId}/map`}
    />
  ) : (
    <div ref={mapContainer} className={className}></div>
  );
}
