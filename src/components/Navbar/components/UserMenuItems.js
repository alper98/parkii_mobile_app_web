import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchRestrictions } from "../../../redux/features/mapSlice";
import { setSettings } from "../../../redux/features/userSlice";
import { SettingsDialog } from "./SettingsDialog";

export function UserMenuItems({
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
  handleLogout,
}) {
  const user = useSelector((s) => s.user.user);
  const radius = useSelector((s) => s.user.settings.radius);
  const viewState = useSelector((s) => s.map.viewState);

  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    handleCloseUserMenu();
    setOpen(true);
  };

  const handleClose = () => {
    if (location.pathname === "/map") {
      dispatch(
        fetchRestrictions({
          longitude: viewState.longitude,
          latitude: viewState.latitude,
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
          <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: "45px",
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          Logged in as: {user.name}
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
