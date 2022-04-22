import React from "react";
import Map, { GeolocateControl, Layer, Source } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { AddressCard } from "./components/AddressCard";

export function MapContainer({
  MAPBOX_TOKEN,
  geolocateControlRef,
  setLng,
  setLat,
  zones,
  layerStyle,
  address,
  currentZone,
}) {
  const dispatch = useDispatch();
  const lat = useSelector((state) => state.map.lat);
  const lng = useSelector((state) => state.map.lng);
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
