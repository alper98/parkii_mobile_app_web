import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRestrictions } from "../../redux/features/mapSlice";
import { logout, setSettings } from "../../redux/features/userSlice";
import { DesktopMenuItems } from "./components/DesktopMenuItems";
import { MobileMenuItems } from "./components/MobileMenuItems";
import { SettingsDialog } from "./components/SettingsDialog";

const NavbarComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const radius = useSelector((s) => s.user.settings.radius);
  const coordinates = useSelector((s) => s.map.coordinates);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    navigate("/login");
  };

  const handleClickDesktopMenu = (path) => {
    navigate(path);
  };

  const handleClickOpen = () => {
    handleCloseNavMenu();
    setOpen(true);
  };

  const handleClose = () => {
    if (location.pathname === "/map") {
      dispatch(
        fetchRestrictions({
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          distance: radius,
        })
      );
    }
    setOpen(false);
  };

  const handleInputChange = (event) => {
    localStorage.setItem("settings", radius);
    dispatch(
      setSettings({
        radius: event.target.value === "" ? "" : Number(event.target.value),
      })
    );
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", height: "100%" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <MobileMenuItems
                handleOpenNavMenu={handleOpenNavMenu}
                anchorElNav={anchorElNav}
                handleCloseNavMenu={handleCloseNavMenu}
                handleClickOpen={handleClickOpen}
                handleLogout={handleLogout}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <DesktopMenuItems
                handleClickDesktopMenu={handleClickDesktopMenu}
                handleClickOpen={handleClickOpen}
              />
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleLogout}
                sx={{
                  my: 2,
                  color: "black",
                }}
              >
                <LogoutIcon fontSize="large" style={{ marginRight: 7 }} />
                Logout
              </Button>
            </Box>
          </>
        </Toolbar>
      </Container>
      <SettingsDialog
        open={open}
        handleClose={handleClose}
        Number={Number}
        radius={radius}
        handleInputChange={handleInputChange}
      />
    </AppBar>
  );
};
export default NavbarComponent;
