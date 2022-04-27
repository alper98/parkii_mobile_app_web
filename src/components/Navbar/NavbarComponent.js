import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../userContext";
import { DesktopMenuItems } from "./components/DesktopMenuItems";
import { MobileMenuItems } from "./components/MobileMenuItems";
import { UserMenuItems } from "./components/UserMenuItems";

const NavbarComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

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
    setUser(null);
    console.log(user);
    setAnchorElUser(null);
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
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              </Box>
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
                  user={user}
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
