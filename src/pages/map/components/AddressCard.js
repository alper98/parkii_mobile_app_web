import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";
const GOOGLE_API_KEY = "AIzaSyD-LIMt0ZLOGvNWiQM3pMcI0N2Sa7LNjJ4";
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");

export function AddressCard({ viewState }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    Geocode.fromLatLng(viewState.latitude, viewState.longitude).then(
      (response) => {
        let address = response.results[0].formatted_address;
        const index = address.lastIndexOf(",");
        address = address.slice(0, index);
        setAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [viewState.latitude, viewState.longitude]);

  return (
    <Card
      className="mgl-map-overlay"
      sx={{
        minWidth: "100%",
        minHeight: "10%",
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
