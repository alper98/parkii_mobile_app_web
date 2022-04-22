import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function AddressCard({ address, zone }) {
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
            {zone ? (
              <>
                {zone.properties.beskrivelse} - {zone.properties.navn}
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
