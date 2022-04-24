import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Parkii.dk
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MobileMenuItems
              handleOpenNavMenu={handleOpenNavMenu}
              anchorElNav={anchorElNav}
              Boolean={Boolean}
              handleCloseNavMenu={handleCloseNavMenu}
              Link={Link}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <DesktopMenuItems handleCloseNavMenu={handleCloseNavMenu} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarComponent;

function DesktopMenuItems({ handleCloseNavMenu }) {
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

function MobileMenuItems({
  handleOpenNavMenu,
  anchorElNav,
  Boolean,
  handleCloseNavMenu,
  Link,
}) {
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <MenuItem component={Link} to={`/Profile`} onClick={handleCloseNavMenu}>
          <IconButton size="large">
            <MenuIcon />
          </IconButton>
          Profile
        </MenuItem>
        <MenuItem component={Link} to={`/Camera`} onClick={handleCloseNavMenu}>
          <IconButton size="large">
            <LinkedCameraIcon />
          </IconButton>
          Camera
        </MenuItem>
        <MenuItem component={Link} to={`/Map`} onClick={handleCloseNavMenu}>
          <IconButton size="large">
            <MapIcon />
          </IconButton>
          Map
        </MenuItem>
      </Menu>
    </>
  );
}
