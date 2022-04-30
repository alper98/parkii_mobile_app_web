import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import userService from "../../api/userService";
import UserContext from "../../userContext";
import ProfileTextFields from "./components/ProfileTextFields";

const theme = createTheme();

export default function ProfilePage() {
  const [user, setUser] = useContext(UserContext);

  const handleUpdate = async (data) => {
    const response = await userService.update(user.id, data);
    if (response.user) {
      toast.success(response.message, {
        toastId: "success",
      });
      setUser(response.user);
    } else if (response.error) {
      toast.error(response.error, { toastId: "error" });
    } else {
      toast.error("Network error", {
        toastId: "error",
      });
    }
    toast.clearWaitingQueue();
  };

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
            <ProfileTextFields handleUpdate={handleUpdate} />
          </Box>
        </Box>
      </Container>
      <ToastContainer
        limit={1}
        position={"top-right"}
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </ThemeProvider>
  );
}
