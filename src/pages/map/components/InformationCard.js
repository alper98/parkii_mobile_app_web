import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as turf from "@turf/turf";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestrictionById,
  fetchRestrictions,
  setCurrentRestriction,
  setCurrentZone,
} from "../../../redux/features/mapSlice";

export function InformationCard({ zones }) {
  const coordinates = useSelector((s) => s.map.coordinates);
  const currentZone = useSelector((s) => s.map.currentZone);
  const currentRestriction = useSelector((s) => s.map.currentRestriction);
  const restrictions = useSelector((s) => s.map.restrictions);
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
  }, [coordinates.longitude, coordinates.latitude]);

  useEffect(() => {
    if (!restrictions.features) return;
    for (let restriction of restrictions.features) {
      const nearestRestriction = turf.nearestPointOnLine(restriction.geometry, [
        coordinates.longitude,
        coordinates.latitude,
      ]);
      if (nearestRestriction.properties.dist < 0.05) {
        dispatch(fetchRestrictionById(restriction.properties.id));
        break;
      }
    }
  }, [coordinates.longitude, coordinates.latitude, restrictions]);

  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "95%",
          height: "200px",
          position: "absolute",
          bottom: 20,
          opacity: "90%",
        }}
      >
        {currentRestriction ? (
          <CardContent>
            <Typography variant="h6" component="div">
              <>Parking allowed: {currentRestriction.parking_allowed}</>
            </Typography>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Street: {currentRestriction.vejnavn}
            </Typography>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Type of zone: {currentRestriction.p_ordning}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Restrictions text: {currentRestriction.restriktionstekst}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Rule: {currentRestriction.rule}
            </Typography>
          </CardContent>
        ) : (
          <Typography variant="h6" component="div" sx={{ margin: 4 }}>
            <>No information outside Copenhagen</>
          </Typography>
        )}
      </Card>
    </Grid>
  );
}
