import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

export function SettingsDialog({
  open,
  handleClose,
  radius,
  handleInputChange,
}) {
  return (
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
              value={Number(radius)}
              onChange={handleInputChange}
              valueLabelDisplay="auto"
              step={50}
              min={100}
              max={1000}
            />
          </Grid>
          <Grid item>{radius} meters</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
