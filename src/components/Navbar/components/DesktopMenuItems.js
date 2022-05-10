import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";

export function DesktopMenuItems({ handleClickDesktopMenu, handleClickOpen }) {
  return (
    <>
      <Button
        onClick={() => handleClickDesktopMenu("/profile")}
        sx={{
          my: 2,
          color: "black",
          display: "block",
        }}
      >
        <PersonIcon fontSize="large" style={{ marginRight: 7 }} />
        Profile
      </Button>
      <Button
        onClick={() => handleClickDesktopMenu("/camera")}
        sx={{
          my: 2,
          color: "black",
          display: "block",
        }}
      >
        <LinkedCameraIcon fontSize="large" style={{ marginRight: 7 }} />
        Camera
      </Button>
      <Button
        onClick={() => handleClickDesktopMenu("/map")}
        sx={{
          my: 2,
          color: "black",
          display: "block",
        }}
      >
        <MapIcon fontSize="large" style={{ marginRight: 7 }} />
        Map
      </Button>
      <Button
        onClick={handleClickOpen}
        sx={{
          my: 2,
          color: "black",
          display: "block",
        }}
      >
        <SettingsIcon fontSize="large" style={{ marginRight: 7 }} />
        Settings
      </Button>
    </>
  );
}
