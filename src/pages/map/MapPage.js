// eslint-disable-next-line import/no-webpack-loader-syntax
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import Map, { GeolocateControl } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import * as spinner from "../../lotties/spinner.json";
import {
  fetchRestrictions,
  fetchZones,
  setViewState,
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
  const viewState = useSelector((s) => s.map.viewState);
  const [isLoading, setIsLoading] = useState(true);

  const loadRestrictions = async () => {
    await dispatch(
      fetchRestrictions({
        latitude: viewState.latitude,
        longitude: viewState.longitude,
        distance: radius,
      })
    );
    setIsLoading(false);
  };

  const loadZones = async () => {
    await dispatch(fetchZones());
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await loadZones();
      await loadRestrictions();
    }
    fetchData();
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
        {!isLoading && zones && (
          <MapLayer
            data={zones}
            dataStyle={zonesStyle}
            dataTextStyle={zonesTextStyle}
          />
        )}
        {!isLoading && restrictions && (
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
