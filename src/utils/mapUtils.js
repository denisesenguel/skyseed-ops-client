function addMapLayer(map, data, name, type, paint) {

  try {
      
      map.addSource(name, {
        type: "geojson",
        data: data,
      });
  } catch (error) {
      console.log("error adding source: ", error);
  }

  map.addLayer({
    id: name,
    type: type,
    source: name,
    paint: paint,
  });
}

function formatGeoJson(data) {
  const formatted = { type: "FeatureCollection", features: [] };
  formatted.features = data.map((item, index) => {
    const { geometry, ...properties } = item;
    return {
      type: "Feature",
      id: index,
      geometry: geometry,
      properties: properties,
    };
  });
  return formatted;
}

function filterAirspaces(airspaceData) {
  const filteredAirspaces = JSON.parse(JSON.stringify(airspaceData));
  filteredAirspaces.features = airspaceData.features.filter(
    (feature) =>
      feature.properties.lowerLimit?.unit === 1 &&
      feature.properties.lowerLimit.value <= 328
  );
  return filteredAirspaces;
}

export { formatGeoJson, filterAirspaces, addMapLayer };
