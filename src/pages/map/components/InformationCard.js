import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as turf from "@turf/turf";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentZone } from "../../../redux/features/mapSlice";

export function InformationCard({ zones }) {
  const viewState = useSelector((s) => s.map.viewState);

  const currentZone = useSelector((s) => s.map.currentZone);
  const dispatch = useDispatch();

  useEffect(() => {
    if (zones) {
      for (let zone of zones.features) {
        if (
          turf.booleanPointInPolygon(
            [viewState.longitude, viewState.latitude],
            zone.geometry
          )
        ) {
          dispatch(setCurrentZone(zone));
          break;
        }
      }
    }
  }, []);

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
            {currentZone ? (
              <>{currentZone.properties.beskrivelse} </>
            ) : (
              "Ingen zone fundet"
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
