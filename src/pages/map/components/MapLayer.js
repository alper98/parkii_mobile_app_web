import { Layer, Source } from "react-map-gl";

export function MapLayer({ data, dataStyle, dataTextStyle }) {
  return (
    <>
      <Source id={data.name} type="geojson" data={data}>
        <Layer {...dataStyle} />
        <Layer {...dataTextStyle} />
      </Source>
    </>
  );
}
