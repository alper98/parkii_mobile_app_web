// eslint-disable-next-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl";
import mapService from "../../api/mapService";
import zones from "../../zones.json";
import { AddressCard } from "./components/AddressCard";
import { MapLayer } from "./components/MapLayer";

export default function MapPage() {
  const mapRef = useRef();
  const geolocateControlRef = useRef();
  const [restrictions, setRestrictions] = useState();

  const [startingCoords, setStartingCoords] = useState({
    longitude: 12.568337,
    latitude: 55.676098,
  });

  const [viewState, setViewState] = useState({
    longitude: 12.568337,
    latitude: 55.676098,
    zoom: 9,
  });

  async function getRestrictions(latitude, longitude) {
    const response = await mapService.getRestrictions(latitude, longitude);
    if (response.restrictions) {
      console.log("Fetched new restrictions");
      setRestrictions(response.restrictions);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      getRestrictions(pos.coords.latitude, pos.coords.longitude);
      setViewState((state) => ({
        ...state,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      }));
      console.log(restrictions);
    });
  }, []);

  return (
    <>
      {restrictions && zones && (
        <Map
          ref={mapRef}
          onLoad={() => {
            geolocateControlRef.current.trigger();
          }}
          initialViewState={viewState}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        >
          <GeolocateControl
            ref={geolocateControlRef}
            positionOptions={{
              enableHighAccuracy: true,
            }}
            trackUserLocation={true}
            onGeolocate={(pos) => {
              setViewState((state) => ({
                ...state,
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
              }));
            }}
          />
          <MapLayer zones={zones} restrictions={restrictions} />
          <AddressCard viewState={viewState} />
        </Map>
      )}
    </>
  );
}
