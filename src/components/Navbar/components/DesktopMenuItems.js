import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export function DesktopMenuItems({ handleCloseNavMenu }) {
  return (
    <>
      <Button
        onClick={handleCloseNavMenu}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
        href="Profile"
      >
        <IconButton size="large">
          <PersonIcon fontSize="large" />
        </IconButton>
        Profile
      </Button>
      <Button
        onClick={handleCloseNavMenu}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
        href="Camera"
      >
        <IconButton size="large">
          <LinkedCameraIcon fontSize="large" />
        </IconButton>
        Camera
      </Button>
      <Button
        onClick={handleCloseNavMenu}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
        href="Map"
      >
        <IconButton size="large">
          <MapIcon fontSize="large" />
        </IconButton>
        Map
      </Button>
    </>
  );
}
