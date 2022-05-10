import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { deleteUser, update } from "../../redux/features/userSlice";
import ProfileCard from "./components/ProfileCard";
import ProfileTextFields from "./components/ProfileTextFields";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const handleUpdate = async (data) => {
    dispatch(update(data));
  };

  const handleDelete = async () => {
    dispatch(deleteUser());
  };

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
          <ProfileCard handleDelete={handleDelete} />
        </Box>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6">Edit your profile</Typography>
        </Box>
        <Box>
          <ProfileTextFields handleUpdate={handleUpdate} />
        </Box>
      </Box>
    </>
  );
}
