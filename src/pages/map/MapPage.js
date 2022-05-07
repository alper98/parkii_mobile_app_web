// eslint-disable-next-line import/no-webpack-loader-syntax
import { distanceTo } from "geolocation-utils";
import { useEffect, useRef } from "react";
import Map, { GeolocateControl } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestrictions, setViewState } from "../../redux/features/mapSlice";
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
  const geolocateControlRef = useRef();

  const mapStyle = useSelector((s) => s.map.mapStyle);
  const viewState = useSelector((s) => s.map.viewState);
  const startingCoords = useSelector((s) => s.map.startingCoords);
  const radius = useSelector((s) => s.user.settings.radius);
  const restrictions = useSelector((s) => s.map.restrictions);
  const zones = useSelector((s) => s.map.zones);
  const currentZone = useSelector((s) => s.map.currentZone);
  const dispatch = useDispatch();

  useEffect(() => {
    const distance = distanceTo(
      { lat: startingCoords.latitude, lon: startingCoords.longitude },
      { lat: viewState.latitude, lon: viewState.longitude }
    );

    const distanceFromSettings = (radius * 0.001) / 2;

    if (distance > distanceFromSettings) {
      dispatch(
        fetchRestrictions({
          latitude: viewState.latitude,
          longitude: viewState.longitude,
          distance: radius,
        })
      );
    }
  }, [viewState.latitude, viewState.longitude]);

  return (
    <>
      <div>{viewState.latitude}</div>
      <div>{viewState.longitude}</div>
      <Map
        ref={mapRef}
        onLoad={() => {
          geolocateControlRef.current.trigger();
        }}
        initialViewState={viewState}
        mapStyle={mapStyle}
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
              setViewState({
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
              })
            );
          }}
        />
        {zones && (
          <MapLayer
            data={zones}
            dataStyle={zonesStyle}
            dataTextStyle={zonesTextStyle}
          />
        )}
        {restrictions && (
          <MapLayer
            data={restrictions}
            dataStyle={restrictionsStyle}
            dataTextStyle={restrictionsTextStyle}
          />
        )}
        <InformationCard />
      </Map>
    </>
  );
}
