// eslint-disable-next-line import/no-webpack-loader-syntax
import Typography from "@mui/material/Typography";
import { distanceTo } from "geolocation-utils";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import Map, { GeolocateControl } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import * as spinner from "../../lotties/spinner.json";
import {
  fetchRestrictions,
  fetchZones,
  setCoordinates,
} from "../../redux/features/mapSlice";
import { InformationCard } from "./components/InformationCard";
import { MapLayer } from "./components/MapLayer";
import {
  restrictionsStyle,
  restrictionsTextStyle,
  zonesStyle,
  zonesTextStyle,
} from "./components/MapStyle";

export default function MapPage() {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const geolocateControlRef = useRef();
  const zones = useSelector((s) => s.map.zones);
  const restrictions = useSelector((s) => s.map.restrictions);
  const radius = useSelector((s) => s.user.settings.radius);
  const coordinates = useSelector((s) => s.map.coordinates);
  const coordinatesLastFetch = useSelector((s) => s.map.coordinatesLastFetch);
  const mapLoading = useSelector((s) => s.map.mapLoading);

  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchZones());
      dispatch(
        fetchRestrictions({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          distance: radius,
        })
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const distance = distanceTo(
        {
          lat: coordinatesLastFetch.latitude,
          lon: coordinatesLastFetch.longitude,
        },
        { lat: coordinates.latitude, lon: coordinates.longitude }
      );

      const distanceFromSettings = radius / 2;

      if (distance > distanceFromSettings) {
        dispatch(
          fetchRestrictions({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            distance: radius,
          })
        );
      }
    }
    fetchData();
  }, [coordinates.latitude, coordinates.longitude]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        setCoordinates({
          longitude: 12.550212407204201,
          latitude: 55.67818764755417,
        })
      );
    }, 3000);
    return function cleanup() {
      clearTimeout(timeoutId);
    };
  }, []);

  if (mapLoading)
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
        onMove={(evt) => setViewState(evt.viewState)}
        onLoad={() => {
          geolocateControlRef.current.trigger();
        }}
        initialViewState={coordinates}
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
            dispatch(
              setCoordinates({
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
              })
            );
          }}
        />
        {viewState.zoom > 12 && !mapLoading && zones?.features && (
          <MapLayer
            data={zones}
            dataStyle={zonesStyle}
            dataTextStyle={zonesTextStyle}
          />
        )}
        {viewState.zoom > 12 && !mapLoading && restrictions?.features && (
          <MapLayer
            data={restrictions}
            dataStyle={restrictionsStyle}
            dataTextStyle={restrictionsTextStyle}
          />
        )}
        <InformationCard zones={zones} />
      </Map>
    </>
  );
}
