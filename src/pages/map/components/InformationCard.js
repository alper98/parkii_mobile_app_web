import { CardActionArea } from "@mui/material";
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
  }, [coordinates]);

  return (
    <Card
      className="mgl-map-overlay"
      sx={{
        minWidth: "100%",
        minHeight: "50px",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {currentZone ? (
              <>{currentZone.properties.beskrivelse} </>
            ) : (
              "Restrictions only available in Copenhagen"
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
