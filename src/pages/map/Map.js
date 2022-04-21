import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { memo, useEffect, useRef, useState } from "react";
import zones from "../../data.json";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmlnYWxwIiwiYSI6ImNsMjd4dGQ2bzAweGEzaXRwcDNnMnljcnQifQ.zBaMSL1v-DxSMs2dFcYddA";

function Map() {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(12);
  const [lat, setLat] = useState(55);
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("load", () => {
      map.addSource("parking-zones", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: zones.features,
        },
      });

      map.addLayer({
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

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
}
export default memo(Map);
