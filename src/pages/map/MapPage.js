// eslint-disable-next-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Map, { GeolocateControl } from "react-map-gl";
import mapService from "../../api/mapService";
import { AddressCard } from "./components/AddressCard";
import { MapLayer } from "./components/MapLayer";
import zones from "../../zones.json";
export default function MapPage() {
  const mapRef = useRef();
  const geolocateControlRef = useRef();
  const [restrictions, setRestrictions] = useState();

  const [viewState, setViewState] = useState({
    longitude: 12.568337,
    latitude: 55.676098,
    zoom: 16,
  });

  async function getRestrictions(latitude, longitude) {
    const response = await mapService.getRestrictions(latitude, longitude);
    if (response.restrictions) return setRestrictions(response.restrictions);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      getRestrictions(pos.coords.latitude, pos.coords.longitude);
      setViewState((state) => ({
        ...state,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      }));
    });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Map - Parkii.dk</title>
      </Helmet>
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

        {zones && restrictions && (
          <MapLayer zones={zones} restrictions={restrictions} />
        )}
        {zones && <MapLayer zones={zones} />}
        <AddressCard viewState={viewState} />
      </Map>
    </>
  );
}
