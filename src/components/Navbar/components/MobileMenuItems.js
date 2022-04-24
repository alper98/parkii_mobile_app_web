import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function MobileMenuItems({
  handleOpenNavMenu,
  anchorElNav,
  handleCloseNavMenu,
  Link,
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
        <MenuItem component={Link} to={`/Profile`}>
          <IconButton size="large">
            <MenuIcon />
          </IconButton>
          Profile
        </MenuItem>
        <MenuItem component={Link} to={`/Camera`}>
          <IconButton size="large">
            <LinkedCameraIcon />
          </IconButton>
          Camera
        </MenuItem>
        <MenuItem component={Link} to={`/Map`}>
          <IconButton size="large">
            <MapIcon />
          </IconButton>
          Map
        </MenuItem>
      </Menu>
    </>
  );
}
