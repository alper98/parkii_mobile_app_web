import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import UserContext from "../../userContext";
import ProfileTextFields from "./components/ProfileTextFields";

const theme = createTheme();

export default function ProfilePage() {
  const [user, setUser] = useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My profile - Parkii.dk</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <ProfileTextFields />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
