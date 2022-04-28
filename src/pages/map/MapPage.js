// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, { GeolocateControl, Layer, Source } from "!react-map-gl";
import Typography from "@mui/material/Typography";
import { useEffect, useState, useRef } from "react";
import Lottie from "react-lottie";
import { useQueries } from "react-query";
import api from "../../api/ApiClient";
import * as failure from "../../lotties/failure.json";
import * as spinner from "../../lotties/spinner.json";
import { AddressCard } from "./components/AddressCard";
import {
  restrictionsStyle,
  restrictionsTextStyle,
  zonesStyle,
} from "./components/MapStyle";

export default function MapPage() {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 14,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setViewState({
          ...viewState,
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        });
      });
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
          params: {
            latitude: viewState.latitude,
            longitude: viewState.longitude,
            distance: 0.5,
          },
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
      initialViewState={viewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
    >
      <GeolocateControl
        positionOptions={{
          enableHighAccuracy: true,
        }}
        trackUserLocation={true}
        onGeolocate={(pos) => {
          setViewState({
            ...viewState,
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          });
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
      <AddressCard viewState={viewState} />
    </Map>
  );
}
