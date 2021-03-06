import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchRestrictions } from "../../../redux/features/mapSlice";
import { logout, setSettings } from "../../../redux/features/userSlice";
import { SettingsDialog } from "./SettingsDialog";

export function UserMenuItems({ handleOpenUserMenu, isUserMenuOpen }) {
  const user = useSelector((s) => s.user.user);
  const radius = useSelector((s) => s.user.settings.radius);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const coordinates = useSelector((s) => s.map.coordinates);
  const location = useLocation();

  const handleClickOpen = () => {
    handleOpenUserMenu();
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
    <>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{
            p: 0,
          }}
        >
          <Avatar
            alt={user.name}
            sx={{ backgroundColor: "white", color: "black" }}
            src="/static/images/avatar/2.jpg"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: "45px",
        }}
        id="menu-appbar"
        anchorEl={isUserMenuOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(isUserMenuOpen)}
        onClose={handleOpenUserMenu}
      >
        <MenuItem onClick={handleOpenUserMenu}>
          Logged in as: {user.name}
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>Settings</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </MenuItem>
        <SettingsDialog
          open={open}
          handleClose={handleClose}
          Number={Number}
          radius={radius}
          handleInputChange={handleInputChange}
        />
      </Menu>
    </>
  );
}
