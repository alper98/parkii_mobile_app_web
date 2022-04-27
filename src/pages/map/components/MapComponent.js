// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, { GeolocateControl, Layer, Source } from "!react-map-gl";
import Typography from "@mui/material/Typography";
import { useState, useCallback } from "react";
import Lottie from "react-lottie";
import { useQueries } from "react-query";
import api from "../../../api/ApiClient";
import * as failure from "../../../lotties/failure.json";
import * as spinner from "../../../lotties/spinner.json";
import { AddressCard } from "./AddressCard";
import {
  restrictionsStyle,
  restrictionsTextStyle,
  zonesStyle,
} from "./MapStyle";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export function MapComponent() {
  const [lat, setLat] = useState(55.676098);
  const [lng, setLng] = useState(12.568337);

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const results = useQueries([
    {
      queryKey: ["zones"],
      queryFn: async () => await api.get("/parking/zones"),
    },
    {
      queryKey: ["restrictions"],
      queryFn: async () =>
        await api.get("/parking/restrictions", {
          params: { latitude: lat, longitude: lng, distance: 0.5 },
        }),
    },
  ]);

  const isLoading = results.some((result) => result.isLoading);
  const error = results.some((result) => result.error);
  const zones = results[0].data;
  const restrictions = results[1].data;

  if (isLoading)
    return (
      <Typography variant="h5" textAlign={"center"}>
        <Lottie
          options={{ loop: true, autoplay: true, animationData: spinner }}
          height={250}
          width={250}
        />
        Initializing map...
      </Typography>
    );

  if (error)
    return (
      <Typography variant="h5" textAlign={"center"}>
        <Lottie
          options={{ loop: true, autoplay: true, animationData: failure }}
          height={150}
          width={150}
        />
        Error loading the map - Contact kontakt@parkii.dk
      </Typography>
    );

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
        positionOptions={{
          enableHighAccuracy: true,
        }}
        ref={geolocateControlRef}
        trackUserLocation={true}
        onGeolocate={(position) => {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        }}
      />

      {!isLoading && zones.data && restrictions.data && (
        <>
          <Source id="zones" type="geojson" data={zones.data}>
            <Layer {...zonesStyle} />
          </Source>
          <Source
            id="restrictions"
            key={"restrictions"}
            type="geojson"
            data={restrictions.data}
          >
            <Layer {...restrictionsStyle} />
            <Layer {...restrictionsTextStyle} />
          </Source>
        </>
      )}
      <AddressCard lat={lat} lng={lng} />
    </Map>
  );
}
