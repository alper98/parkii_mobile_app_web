import * as turf from "@turf/turf";
import { useCallback, useEffect } from "react";
import Geocode from "react-geocode";
import { useDispatch, useSelector } from "react-redux";
import zones from "../../data.json";
import {
  setAddress,
  setCurrentZone,
  setLat,
  setLng,
} from "../../redux/features/map/mapSlice";
import { MapContainer } from "./MapContainer";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYmlnYWxwIiwiYSI6ImNsMjd4dGQ2bzAweGEzaXRwcDNnMnljcnQifQ.zBaMSL1v-DxSMs2dFcYddA";

const GOOGLE_API_KEY = "AIzaSyD-LIMt0ZLOGvNWiQM3pMcI0N2Sa7LNjJ4";
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");

const layerStyle = {
  id: "point",
  type: "fill",
  paint: {
    "fill-color": ["get", "navn"],
    "fill-opacity": 0.25,
  },
};

function MapComponent() {
  const dispatch = useDispatch();
  const lat = useSelector((state) => state.map.lat);
  const lng = useSelector((state) => state.map.lng);
  const currentZone = useSelector((state) => state.map.currentZone);
  const address = useSelector((state) => state.map.address);
  let zoneFound = false;

  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      let address = response.results[0].formatted_address;
      const index = address.lastIndexOf(",");
      address = address.slice(0, index);
      dispatch(setAddress(address));
    },
    (error) => {
      console.error(error);
    }
  );

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  // running a check everytime lat or lng changes (aka a change in the users location)
  // determines if the currentzone is set and if the user is in the same zone
  // if not, determines the zone the user is in and sets the zone state to that zone
  useEffect(() => {
    if (currentZone) {
      if (turf.booleanPointInPolygon([lng, lat], currentZone.geometry)) {
        return;
      } else {
        zones.features.forEach((element) => {
          if (turf.booleanPointInPolygon([lng, lat], element.geometry)) {
            dispatch(setCurrentZone(element));
            zoneFound = true;
          }
        });
        if (!zoneFound) {
          dispatch(setCurrentZone(null));
        }
      }
    } else {
      // current zone not true
      zones.features.forEach((element) => {
        if (turf.booleanPointInPolygon([lng, lat], element.geometry)) {
          dispatch(setCurrentZone(element));
        }
      });
    }
  }, [lat, lng]);

  return (
    <MapContainer
      MAPBOX_TOKEN={MAPBOX_TOKEN}
      geolocateControlRef={geolocateControlRef}
      dispatch={dispatch}
      setLng={setLng}
      setLat={setLat}
      zones={zones}
      layerStyle={layerStyle}
      address={address}
      currentZone={currentZone}
    />
  );
}
export default MapComponent;
