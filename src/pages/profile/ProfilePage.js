import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ProfileCard from "./components/ProfileCard";
import ProfileTextFields from "./components/ProfileTextFields";

export default function ProfilePage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: 5,
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <ProfileCard />
        </Box>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6">Edit your profile</Typography>
        </Box>
        <Box>
          <ProfileTextFields />
        </Box>
      </Box>
    </>
  );
}
