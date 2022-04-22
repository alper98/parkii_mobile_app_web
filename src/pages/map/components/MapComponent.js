import React from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, { GeolocateControl, Layer, Source } from "!react-map-gl";
import { useDispatch } from "react-redux";
import { AddressCard } from "./AddressCard";

export function MapComponent({
  MAPBOX_TOKEN,
  geolocateControlRef,
  setLng,
  setLat,
  lat,
  lng,
  zones,
  layerStyle,
  address,
  currentZone,
}) {
  const dispatch = useDispatch();
  return (
    <Map
      reuseMaps
      initialViewState={{
        latitude: lat,
        longitude: lng,
        zoom: 13,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <GeolocateControl
        ref={geolocateControlRef}
        positionOptions={{
          enableHighAccuracy: true,
        }}
        trackUserLocation={true}
        onGeolocate={(position) => {
          dispatch(setLng(position.coords.longitude));
          dispatch(setLat(position.coords.latitude));
        }}
      />
      <Source id="my-data" type="geojson" data={zones}>
        <Layer {...layerStyle} />
      </Source>
      <AddressCard address={address} zone={currentZone} />
    </Map>
  );
}
