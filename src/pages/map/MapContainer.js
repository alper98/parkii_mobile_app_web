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
  return <MapComponent layerStyle={layerStyle} />;
}
export default MapContainer;
