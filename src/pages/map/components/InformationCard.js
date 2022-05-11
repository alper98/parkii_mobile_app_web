import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as turf from "@turf/turf";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestrictionById,
  fetchRestrictions,
  setCurrentZone,
} from "../../../redux/features/mapSlice";

export function InformationCard({ zones }) {
  const dispatch = useDispatch();
  const coordinates = useSelector((s) => s.map.coordinates);
  const currentZone = useSelector((s) => s.map.currentZone);
  const currentRestriction = useSelector((s) => s.map.currentRestriction);
  const restrictions = useSelector((s) => s.map.restrictions);
  const radius = useSelector((s) => s.user.settings.radius);

  const [parkingAllowedColor, setParkingAllowedColor] = useState("white");
  const [parkingAllowedText, setParkingAllowedText] = useState("");

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
  }, []);

  useEffect(() => {
    if (currentRestriction?.parking_allowed === "yes") {
      setParkingAllowedColor("#9CE5b8");
      setParkingAllowedText("You can park here");
    }
    if (currentRestriction?.parking_allowed === "no") {
      setParkingAllowedColor("#D2222D");
      setParkingAllowedText("You cant park here");
    }
    if (currentRestriction?.parking_allowed === "criteria") {
      setParkingAllowedColor("#FFBF00");
      setParkingAllowedText("Parking is under a criteria");
    }
  }, [currentRestriction]);

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
          backgroundColor: parkingAllowedColor,
          width: "95%",
          height: currentRestriction ? "200px" : "100px",
          position: "absolute",
          bottom: 20,
          opacity: "90%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {currentRestriction ? (
          <>
            <CardContent>
              <Grid
                container
                direction="row"
                alignItems="center"
                sx={{ height: "75%" }}
              >
                <Grid item xs={12}>
                  <Typography variant="h5" component="div">
                    {parkingAllowedText}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {currentRestriction.ticket_required ? (
                    <Typography variant="h6">
                      You need a ticket to hold here
                    </Typography>
                  ) : (
                    <Typography variant="h6" component="div">
                      <>No ticket is required</>
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1, width: "100%", height: "25%" }}>
                <Grid item xs={12}>
                  <Typography>Street: {currentRestriction.vejnavn}</Typography>
                </Grid>
                {currentRestriction.rule && (
                  <Grid item xs={12}>
                    <Typography>{currentRestriction.rule}</Typography>
                  </Grid>
                )}
                {currentRestriction.limit && (
                  <Grid item xs={12}>
                    <Typography>
                      From now, parking is allowed to:{" "}
                      {currentRestriction.limit.end}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </>
        ) : (
          <Typography variant="h6" component="div" sx={{ margin: 2 }}>
            <>Restrictions only available in Copenhagen</>
          </Typography>
        )}
      </Card>
    </Grid>
  );
}
