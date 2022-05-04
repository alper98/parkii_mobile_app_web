import MapIcon from "@mui/icons-material/Map";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import UserContext from "../../../userContext";

export function UserMenuItems({
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
  handleLogout,
}) {
  const { currentUser, currentSettings } = useContext(UserContext);
  const [user, setUser] = currentUser;
  const [settings, setSettings] = currentSettings;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    handleCloseUserMenu();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    localStorage.setItem("settings", settings);
    setSettings(event.target.value === "" ? "" : Number(event.target.value));
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
        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Settings</DialogTitle>
          <DialogContent>
            <Typography id="input-slider" gutterBottom>
              Set restrictions radius
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={settings}
                  onChange={handleInputChange}
                  valueLabelDisplay="auto"
                  step={50}
                  min={100}
                  max={1000}
                />
              </Grid>
              <Grid item>{settings} meters</Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
