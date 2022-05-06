import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProfileCard({ handleDelete }) {
  const user = useSelector((s) => s.user.user);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper variant="outlined" square>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography
          sx={{
            mb: 1.5,
          }}
          color="text.secondary"
        >
          Member since: {format(parseISO(user.created_at), "dd-MM-yyyy")}
        </Typography>
        <Typography variant="body2">E-mail: {user.email}</Typography>
        {user.phone && (
          <Typography variant="body2">Phone: {user.phone}</Typography>
        )}
        {user.license_plate && (
          <Typography variant="body2">
            License plate: {user.license_plate}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={handleClickOpen} size="small">
          Delete account
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you leaving us, {user.name.split(" ")[0]}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, that you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
