// eslint-disable-next-line import/no-webpack-loader-syntax
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Lottie from "react-lottie";
import Map, { GeolocateControl } from "react-map-gl";
import mapService from "../../api/mapService";
import * as failure from "../../lotties/failure.json";
import * as spinner from "../../lotties/spinner.json";
import { AddressCard } from "./components/AddressCard";
import { MapLayer } from "./components/MapLayer";

export default function MapPage() {
  const mapRef = useRef();
  const geolocateControlRef = useRef();
  const [zones, setZones] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [restrictions, setRestrictions] = useState();

  const [viewState, setViewState] = useState({
    longitude: 12.568337,
    latitude: 55.676098,
    zoom: 16,
  });

  const fetchRestrictions = async () => {
    const response = await mapService.getRestrictions(
      viewState.latitude,
      viewState.longitude
    );
    if (response.restrictions) {
      return response.restrictions;
    } else {
      setError(true);
    }
  };
  const fetchZones = async () => {
    const response = await mapService.getZones();
    if (response.zones) {
      return response.zones;
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewState((state) => ({
        ...state,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      }));
    });
    async function getZones() {
      setIsLoading(true);
      const zoneData = await fetchZones();
      setZones(zoneData);
      setIsLoading(false);
    }
    getZones();
  }, []);

  useEffect(() => {
    async function getRestrictions() {
      setIsLoading(true);
      const restrictionData = await fetchRestrictions();
      setRestrictions(restrictionData);
      setIsLoading(false);
    }
    getRestrictions();
  }, []);

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

        {!isLoading && zones && restrictions && (
          <MapLayer zones={zones} restrictions={restrictions} />
        )}
        <AddressCard viewState={viewState} />
      </Map>
    </>
  );
}
