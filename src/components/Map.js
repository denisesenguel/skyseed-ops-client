import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";
import airspaceData from "../data/openaip-airspaces.json";
import airportData from "../data/openaip-airports.json";
//import restrictionData from "../data/restrictions-for-drones.json";
import {
  addMapLayer,
  formatGeoJson,
  filterAirspaces,
} from "../utils/mapLayerUtils";

export default function Map(props) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const { className, clickable, projectId } = props;
  const mapContainer = useRef(null);
  const map = useRef(null);

  // TODO: set lat/long to project region (use Google places API first and save to DB)
  const [long, setLong] = useState(7.9589027);
  const [lat, setLat] = useState(47.8200179);
  const [zoom, setZoom] = useState(9);
  // get initial areas from DB!
  const [areas, setAreas] = useState([]);
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true,
    }
    });

  useEffect(() => {
    if (!map.current) initializeMap();
  }, []);

  map.current?.on("load", () => {
    addMapLayer(map.current, formatGeoJson(airportData), "airports", "circle", {
      "circle-color": "#189181",
      "circle-opacity": 0.3,
      // needs to be adjusted within a zoom event listener
      "circle-radius": 10,
      "circle-pitch-scale": "viewport",
    });
    addMapLayer(
      map.current,
      filterAirspaces(airspaceData),
      "airspaces",
      "fill",
      {
        "fill-color": "#d53118",
        "fill-opacity": 0.3,
      }
    );
    // addMapLayer(map.current, restrictionData, "restricted", "fill", {
    //   "fill-color": "#18D57F",
    //   "fill-opacity": 0.3
    // });
  });

  map.current?.on("move", () => {
    setLong(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
  })

  map.current?.on("draw.create", addArea);
  map.current?.on("draw.delete", removeArea);
  //map.current?.on("draw.update", updateAreas);

  
  function initializeMap() {
      map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: process.env.REACT_APP_MAPBOX_STYLE,
          center: [long, lat],
          zoom: zoom
        });
        map.current.addControl(draw);
    }
    
    function addArea(e) {
      //const data = draw.getAll();
      const newAreas = JSON.parse(JSON.stringify(areas));
      newAreas.push(e.features);
      console.log(newAreas);
      setAreas(newAreas);
    }

    function removeArea(e) {
        console.log("index of area to delete: ", areas.indexOf(e.features));
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
