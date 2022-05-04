// eslint-disable-next-line import/no-webpack-loader-syntax
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import Map, { GeolocateControl } from "react-map-gl";
import mapService from "../../api/mapService";
import * as spinner from "../../lotties/spinner.json";
import UserContext from "../../userContext";
import { AddressCard } from "./components/AddressCard";
import { MapLayer } from "./components/MapLayer";
import { calcCrow } from "./util/MapUtil";

export default function MapPage() {
  const mapRef = useRef();
  const geolocateControlRef = useRef();
  const [restrictions, setRestrictions] = useState();
  const [zones, setZones] = useState();
  const { currentUser, currentSettings } = useContext(UserContext);
  const [user, setUser] = currentUser;
  const [settings, setSettings] = currentSettings;
  const [isLoading, setIsLoading] = useState(false);

  const [startingCoords, setStartingCoords] = useState({
    longitude: 12.582434715425201,
    latitude: 55.67415673591182,
  });

  const [viewState, setViewState] = useState({
    longitude: 12.582434715425201,
    latitude: 55.67415673591182,
    zoom: 13,
  });

  async function getRestrictions(latitude, longitude) {
    const response = await mapService.getRestrictions(
      latitude,
      longitude,
      settings
    );
    if (response.restrictions) {
      setRestrictions(response.restrictions);
    }
  }
  async function getZones() {
    const response = await mapService.getZones();
    if (response.zones) {
      setZones(response.zones);
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
      setStartingCoords((state) => ({
        ...state,
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      }));
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getZones();
      await getRestrictions(viewState.latitude, viewState.longitude);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (
      calcCrow(
        startingCoords.latitude,
        startingCoords.longitude,
        viewState.latitude,
        viewState.longitude
      ) >
      (settings * 0.001) / 2
    ) {
      getRestrictions(viewState.latitude, viewState.longitude);
      setStartingCoords((state) => ({
        ...state,
        longitude: viewState.longitude,
        latitude: viewState.latitude,
      }));
    }
  }, [viewState.latitude, viewState.longitude]);

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

  return (
    <>
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
        {restrictions && zones && (
          <MapLayer zones={zones} restrictions={restrictions} />
        )}
        <AddressCard viewState={viewState} />
      </Map>
    </>
  );
}
