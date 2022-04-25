// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, { GeolocateControl, Layer, Source } from "!react-map-gl";
import Typography from "@mui/material/Typography";
import Lottie from "react-lottie";
import { useQueries } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/ApiClient";
import * as spinner from "../../../lotties/spinner.json";
import { setLat, setLng } from "../../../redux/features/map/mapSlice";
import { AddressCard } from "./AddressCard";

const zonesStyle = {
  id: "zones",
  type: "line",
  source: "zones",
  paint: {
    "line-color": "black",
    "line-width": 2,
  },
};

const restrictionsStyle = {
  id: "lineLayer",
  type: "line",
  source: "restrictions",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "rgba(3, 170, 238, 0.5)",
    "line-width": 5,
  },
};

const restrictionsTextStyle = {
  id: "symbols",
  type: "symbol",
  source: "restrictions",
  layout: {
    "symbol-placement": "line",
    "text-font": ["Open Sans Regular"],
    "text-field": "{restriktionstekst}",
    "text-size": 20,
    "text-allow-overlap": true,
  },
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: spinner,
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export function MapComponent() {
  const dispatch = useDispatch();
  const lat = useSelector((s) => s.map.lat);
  const lng = useSelector((s) => s.map.lng);

  const results = useQueries([
    {
      queryKey: ["zones"],
      queryFn: async () => await api.get("/parking/zones"),
    },
    {
      queryKey: ["restrictions"],
      queryFn: async () =>
        await api.get("/parking/restrictions", {
          params: { latitude: lat, longitude: lng, distance: 1.5 },
        }),
    },
  ]);

  const isLoading = results.some((result) => result.isLoading);
  const error = results.some((result) => result.error);
  const zones = results[0].data;
  const restrictions = results[1].data;

  if (isLoading)
    return (
      <Typography variant="h4" textAlign={"center"}>
        <Lottie options={defaultOptions} height={300} width={300} />
        Initializing map...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h4" textAlign={"center"}>
        Error! {error}
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
        trackUserLocation={true}
        onGeolocate={(position) => {
          dispatch(setLng(position.coords.longitude));
          dispatch(setLat(position.coords.latitude));
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
      <AddressCard />
    </Map>
  );
}
