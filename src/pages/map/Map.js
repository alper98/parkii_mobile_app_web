import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { memo, useEffect, useRef } from "react";
import zones from "../../data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmlnYWxwIiwiYSI6ImNsMjd4dGQ2bzAweGEzaXRwcDNnMnljcnQifQ.zBaMSL1v-DxSMs2dFcYddA";

function Map() {
  const mapContainerRef = useRef(null);

  const geolocate = new mapboxgl.GeolocateControl({
    fitBoundsOptions: {
      zoom: 16,
    },
    trackUserLocation: true,
    showUserHeading: true,
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [12.5683371, 55.6760968],
      zoom: 8,
    });
    map.addControl(geolocate);

    map.on("load", () => {
      geolocate.trigger();
      map.addSource("parking-zones", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: zones.features,
        },
      });

      map.addLayer({
        id: "parking-boundary",
        type: "fill",
        source: "parking-zones",
        paint: {
          "fill-color": ["get", "navn"],
          "fill-opacity": 0.25,
        },
        filter: ["==", "$type", "Polygon"],
      });
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="map-container"></div>;
}
export default memo(Map);
