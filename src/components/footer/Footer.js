import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [value, setValue] = useState(0);

  return (
    <div className="App">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          component={Link}
          to="/profile"
        />
        <BottomNavigationAction
          label="Camera"
          icon={<LinkedCameraIcon />}
          component={Link}
          to="/camera"
        />
        <BottomNavigationAction
          label="Map"
          icon={<MapIcon />}
          component={Link}
          to="/map"
        />
      </BottomNavigation>
    </div>
  );
}

export default Footer;
