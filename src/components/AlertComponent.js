import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertComponent({ setError, error }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError((prev) => ({
      error: !prev.error,
      status: "info",
      message: "",
    }));
  };

  return (
    <Snackbar
      open={error.error}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={error.status}
        sx={{
          width: "100%",
        }}
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
}
