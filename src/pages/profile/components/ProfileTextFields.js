import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export function ProfileTextFields({ user }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          value={user.name}
          autoComplete="given-name"
          name="name"
          fullWidth
          id="name"
          label="Name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={user.email}
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={user.phone}
          fullWidth
          name="phone"
          label="Phone"
          placeholder="Enter phone"
          type="tel"
          id="phone"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={user.car}
          fullWidth
          name="car"
          label="Car"
          type="text"
          id="car"
        />
      </Grid>
      <Grid item xs={12}>
        {user.email_verified_at ? (
          <>
            Email is not verified
            <CheckIcon fontSize="large" color="success" />
          </>
        ) : (
          <>
            Email is not verified
            <ClearIcon fontSize="large" color="warning" />
          </>
        )}
      </Grid>
    </Grid>
  );
}
