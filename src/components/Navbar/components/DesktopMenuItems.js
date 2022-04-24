import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

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
        <IconButton size="large">
          <PersonIcon fontSize="large" />
        </IconButton>
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
        <IconButton size="large">
          <LinkedCameraIcon fontSize="large" />
        </IconButton>
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
        <IconButton size="large">
          <MapIcon fontSize="large" />
        </IconButton>
        Map
      </Button>
    </>
  );
}
