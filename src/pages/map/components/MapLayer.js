import { Layer, Source } from "react-map-gl";
import {
  restrictionsStyle,
  restrictionsTextStyle,
  zonesStyle,
  zonesTextStyle,
} from "./MapStyle";

export function MapLayer({ zones, restrictions }) {
  return (
    <>
      <Source id="zones" type="geojson" data={zones}>
        <Layer {...zonesStyle} />
        <Layer {...zonesTextStyle} />
      </Source>
      <Source id="restrictions" type="geojson" data={restrictions}>
        <Layer {...restrictionsStyle} />
        <Layer {...restrictionsTextStyle} />
      </Source>
    </>
  );
}
