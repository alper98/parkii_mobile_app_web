import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setAddress } from "../../../redux/features/map/mapSlice";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");

export function AddressCard() {
  const dispatch = useDispatch();

  const address = useSelector((s) => s.map.address);
  const currentZone = useSelector((s) => s.map.currentZone);
  const lat = useSelector((state) => state.map.lat);
  const lng = useSelector((state) => state.map.lng);

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

  return (
    <Card
      className="mgl-map-overlay"
      sx={{
        minWidth: "100%",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentZone ? (
              <>
                {currentZone.properties.beskrivelse} -{" "}
                {currentZone.properties.navn}
              </>
            ) : (
              "Ingen beskrivelse"
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
