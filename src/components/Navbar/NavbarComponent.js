import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { MobileMenuItems } from "./components/MobileMenuItems";
import { UserMenuItems } from "./components/UserMenuItems";

const NavbarComponent = () => {
  const [isNavOpen, setIsNavOpen] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(null);

  const handleOpenNavMenu = (event) => {
    if (isNavOpen == null) {
      setIsNavOpen(event.currentTarget);
    } else {
      setIsNavOpen(null);
    }
  };

  const handleOpenUserMenu = (event) => {
    if (isUserMenuOpen == null) {
      setIsUserMenuOpen(event.currentTarget);
    } else {
      setIsUserMenuOpen(null);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: "100%",
        justifyContent: "center",
        backgroundColor: "#023E8A",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DriveEtaIcon sx={{ display: { xs: "none" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <MobileMenuItems
              handleOpenNavMenu={handleOpenNavMenu}
              isNavOpen={isNavOpen}
            />
          </Box>
          <DriveEtaIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Parkii
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <UserMenuItems
              handleOpenUserMenu={handleOpenUserMenu}
              isUserMenuOpen={isUserMenuOpen}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarComponent;
