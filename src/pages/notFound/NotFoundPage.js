import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";

export default function NotFoundPage() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingTop={10}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not found - Parkii.dk</title>
      </Helmet>
      <Typography component="h1" variant="h4">
        Page not found - 404
      </Typography>
    </Grid>
  );
}
