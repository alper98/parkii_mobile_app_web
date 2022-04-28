import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import UserContext from "../../userContext";
import { ProfileTextFields } from "./components/ProfileTextFields";

const theme = createTheme();

export default function ProfilePage() {
  const [user, setUser] = useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
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
            <ProfileTextFields user={user} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
