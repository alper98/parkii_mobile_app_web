import * as turf from "@turf/turf";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import zones from "../../data.json";
import { setCurrentZone } from "../../redux/features/map/mapSlice";
import { MapComponent } from "./components/MapComponent";

const layerStyle = {
  id: "point",
  type: "fill",
  paint: {
    "fill-color": ["get", "navn"],
    "fill-opacity": 0.25,
  },
};

function MapContainer() {
  const dispatch = useDispatch();
  const lat = useSelector((state) => state.map.lat);
  const lng = useSelector((state) => state.map.lng);
  const currentZone = useSelector((state) => state.map.currentZone);
  let zoneFound = useRef(false);

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
            zoneFound.current = true;
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

  return <MapComponent zones={zones} layerStyle={layerStyle} />;
}
export default MapContainer;
