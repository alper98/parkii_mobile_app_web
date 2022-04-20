import { useEffect, useRef, useState } from "react";
import zones from "../../data.json";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmlnYWxwIiwiYSI6ImNsMjd4dGQ2bzAweGEzaXRwcDNnMnljcnQifQ.zBaMSL1v-DxSMs2dFcYddA";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(12.565817410358724);
  const [lat, setLat] = useState(55.68417861927885);
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
