// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, { GeolocateControl, Layer, Source } from "!react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { setLat, setLng } from "../../../redux/features/map/mapSlice";
import { AddressCard } from "./AddressCard";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

export function MapComponent({ zones, layerStyle }) {
  const dispatch = useDispatch();
  const lat = useSelector((s) => s.map.lat);
  const lng = useSelector((s) => s.map.lng);

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
      <Source id="my-data" type="geojson" data={zones}>
        <Layer {...layerStyle} />
      </Source>
      <AddressCard />
    </Map>
  );
}
