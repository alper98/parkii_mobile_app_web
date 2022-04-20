import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState, memo } from "react";
import zones from "../../data.json";
import "./Map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmlnYWxwIiwiYSI6ImNsMjd4dGQ2bzAweGEzaXRwcDNnMnljcnQifQ.zBaMSL1v-DxSMs2dFcYddA";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(16);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log("trest");
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (map.current) return; // initialize map only once
          console.log("endnu");
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [position.coords.longitude, position.coords.latitude],
            zoom: zoom,
          });

          map.current.on("load", () => {
            map.current.addSource("parking-zones", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: zones.features,
              },
            });

            map.current.addLayer({
              id: "park-boundary",
              type: "fill",
              source: "parking-zones",
              paint: {
                "fill-color": "#023E8A",
                "fill-opacity": 0.4,
              },
              filter: ["==", "$type", "Polygon"],
            });
          });
          setStatus(null);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }, [zoom]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default memo(Map);
