import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { DesktopMenuItems } from "./components/DesktopMenuItems";
import { MobileMenuItems } from "./components/MobileMenuItems";
import { UserMenuItems } from "./components/UserMenuItems";

const NavbarComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(setUser(null));
    setAnchorElUser(null);
    toast.info("Logged out");
  };

  const handleClickDesktopMenu = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {user && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <MobileMenuItems
                  handleOpenNavMenu={handleOpenNavMenu}
                  anchorElNav={anchorElNav}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { md: "flex" } }}
              >
                Parkii.dk
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <DesktopMenuItems
                  handleClickDesktopMenu={handleClickDesktopMenu}
                />
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <UserMenuItems
                  handleOpenUserMenu={handleOpenUserMenu}
                  anchorElUser={anchorElUser}
                  handleCloseUserMenu={handleCloseUserMenu}
                  handleLogout={handleLogout}
                />
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarComponent;
