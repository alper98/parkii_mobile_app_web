import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";

export function DesktopMenuItems({ handleClickDesktopMenu }) {
  return (
    <>
      <Button
        onClick={() => handleClickDesktopMenu("/profile")}
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
        onClick={() => handleClickDesktopMenu("/camera")}
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
        onClick={() => handleClickDesktopMenu("/map")}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
      >
        <MapIcon fontSize="large" style={{ marginRight: 7 }} />
        Map
      </Button>
    </>
  );
}
