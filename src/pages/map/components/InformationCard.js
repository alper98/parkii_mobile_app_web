import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as turf from "@turf/turf";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestrictions,
  setCurrentZone,
} from "../../../redux/features/mapSlice";

export function InformationCard({ zones }) {
  const coordinates = useSelector((s) => s.map.coordinates);
  const currentZone = useSelector((s) => s.map.currentZone);
  const dispatch = useDispatch();
  const radius = useSelector((s) => s.user.settings.radius);

  useEffect(() => {
    if (!zones) return;
    if (
      currentZone &&
      turf.booleanPointInPolygon(
        [coordinates.longitude, coordinates.latitude],
        currentZone.geometry
      )
    ) {
      return;
    }

    for (let zone of zones.features) {
      if (
        turf.booleanPointInPolygon(
          [coordinates.longitude, coordinates.latitude],
          zone.geometry
        )
      ) {
        dispatch(setCurrentZone(zone));
        console.log(zone);
        console.log(currentZone);
        dispatch(
          fetchRestrictions({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            distance: radius,
          })
        );
        break;
      }
    }
  }, [coordinates.longitude, coordinates.latitude]);

  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        className="mgl-map-overlay"
        sx={{
          width: "95%",
          height: "100px",
          position: "absolute",
          bottom: 20,
          opacity: "90%",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {currentZone ? (
              <>Current zone: {currentZone.properties.beskrivelse} </>
            ) : (
              "Restrictions only available in Copenhagen"
            )}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
