import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Geocode from "react-geocode";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../../redux/features/map/mapSlice";

export function AddressCard() {
  const address = useSelector((s) => s.map.address);
  const lat = useSelector((s) => s.map.lat);
  const lng = useSelector((s) => s.map.lng);
  const dispatch = useDispatch();

  const GOOGLE_API_KEY = "AIzaSyD-LIMt0ZLOGvNWiQM3pMcI0N2Sa7LNjJ4";
  Geocode.setApiKey(GOOGLE_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  useEffect(() => {
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
  }, [lat, lng]);

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
            {address ? <>{address} </> : "Ingen addresse fundet"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
