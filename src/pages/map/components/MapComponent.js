// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, { GeolocateControl, Layer, Source } from "!react-map-gl";
import Lottie from "react-lottie";
import { useQueries } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/ApiClient";
import * as spinner from "../../../lotties/spinner.json";
import { setLat, setLng } from "../../../redux/features/map/mapSlice";
import { AddressCard } from "./AddressCard";

const layerStyle = {
  id: "point",
  type: "line",
  paint: {
    "line-color": "black",
    "line-width": 1,
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
          params: { latitude: lat, longitude: lng },
        }),
    },
  ]);

  const isLoading = results.some((result) => result.isLoading);
  const error = results.some((result) => result.error);
  const zones = results[0].data;
  const restrictions = results[1].data;
  console.log(restrictions);

  if (error) return <p>Error! {error}</p>;

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
      {isLoading && (
        <Lottie options={defaultOptions} height={300} width={300} />
      )}
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
            <Layer {...layerStyle} />
          </Source>
        </>
      )}
      <AddressCard />
    </Map>
  );
}
