import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export function AddressCard() {
  const address = useSelector((s) => s.map.address);
  const currentZone = useSelector((s) => s.map.currentZone);

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
                {currentZone.properties.beskrivelse} -
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
