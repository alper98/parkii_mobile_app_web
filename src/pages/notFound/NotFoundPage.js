import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function NotFoundPage() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingTop={10}
    >
      <Typography component="h1" variant="h4">
        Page not found - 404
      </Typography>
    </Grid>
  );
}
