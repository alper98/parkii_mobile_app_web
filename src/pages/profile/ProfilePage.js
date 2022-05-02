import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useContext } from "react";
import userService from "../../api/userService";
import UserContext from "../../userContext";
import ProfileTextFields from "./components/ProfileTextFields";
import ProfileCard from "./components/ProfileCard";
import { Typography } from "@mui/material";

export default function ProfilePage() {
  const [user, setUser] = useContext(UserContext);

  const handleUpdate = async (data) => {
    const response = await userService.update(user.id, data);
    if (response.user) {
      setUser(response.user);
    }
  };

  const handleDelete = async () => {
    const response = await userService.delete(user.id);
    if (response) {
      setUser(null);
    }
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ minWidth: 275, textAlign: "center", marginTop: 4 }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <ProfileCard user={user} handleDelete={handleDelete} />
          </Box>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6">Edit your profile</Typography>
          </Box>
          <Box>
            <ProfileTextFields handleUpdate={handleUpdate} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
