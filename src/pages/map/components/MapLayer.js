import { Layer, Source } from "react-map-gl";
import {
  restrictionsStyle,
  restrictionsTextStyle,
  zonesStyle,
} from "./MapStyle";

export function MapLayer({ zones, restrictions }) {
  return (
    <>
      <Source id="zones" type="geojson" data={zones}>
        <Layer {...zonesStyle} />
      </Source>
      <Source
        id="restrictions"
        key={"restrictions"}
        type="geojson"
        data={restrictions}
      >
        <Layer {...restrictionsStyle} />
        <Layer {...restrictionsTextStyle} />
      </Source>
    </>
  );
}
