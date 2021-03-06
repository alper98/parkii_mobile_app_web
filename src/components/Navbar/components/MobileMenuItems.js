import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export function MobileMenuItems({
  handleOpenNavMenu,
  isNavOpen,
  handleClickOpen,
  handleLogout,
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
        anchorEl={isNavOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(isNavOpen)}
        onClose={handleOpenNavMenu}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <MenuItem component={Link} to={`/profile`} onClick={handleOpenNavMenu}>
          <IconButton size="large">
            <MenuIcon />
          </IconButton>
          Profile
        </MenuItem>
        <MenuItem component={Link} to={`/camera`} onClick={handleOpenNavMenu}>
          <IconButton size="large">
            <LinkedCameraIcon />
          </IconButton>
          Camera
        </MenuItem>
        <MenuItem component={Link} to={`/map`} onClick={handleOpenNavMenu}>
          <IconButton size="large">
            <MapIcon />
          </IconButton>
          Map
        </MenuItem>
      </Menu>
    </>
  );
}
