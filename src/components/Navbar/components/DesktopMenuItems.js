import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function DesktopMenuItems({ handleOpenUserMenu }) {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => navigate("/profile")}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
      >
        <PersonIcon fontSize="large" style={{ marginRight: 7 }} />
        Profile
      </Button>
      <Button
        onClick={() => navigate("/camera")}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
      >
        <LinkedCameraIcon fontSize="large" style={{ marginRight: 7 }} />
        Camera
      </Button>
      <Button
        onClick={() => navigate("/map")}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
      >
        <MapIcon fontSize="large" style={{ marginRight: 7 }} />
        Map
      </Button>
      <Button
        onClick={handleOpenUserMenu}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
      >
        <SettingsIcon fontSize="large" style={{ marginRight: 7 }} />
        Settings
      </Button>
    </>
  );
}
