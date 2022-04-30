import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import diff from "object-diff";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UserContext from "../../../userContext";
import { validationSchema } from "../util/ProfileUtils";

const theme = createTheme();

export default function ProfileTextFields({ handleUpdate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [user, setUser] = useContext(UserContext);

  const handleClick = (data) => {
    for (const key in data) {
      if (data[key] === "") {
        delete data[key];
      }
    }
    const formBody = diff(user, data);
    if (Object.keys(formBody).length === 0) {
      toast.info("No changes have been made", {
        toastId: "noChanges",
      });
      toast.clearWaitingQueue();
      return;
    }
    handleUpdate(formBody);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
            <TextField
              defaultValue={user.name ? user.name : ""}
              id="name"
              name="name"
              label="Full Name"
              fullWidth
              margin="normal"
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
            />
            <TextField
              defaultValue={user.email ? user.email : ""}
              id="email"
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
            <TextField
              defaultValue={user.phone ? user.phone : null}
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              margin="normal"
              {...register("phone")}
              error={errors.phone ? true : false}
              helperText={errors.phone?.message}
            />
            <TextField
              defaultValue={user.license_plate ? user.license_plate : null}
              id="license_plate"
              name="license_plate"
              label="License Plate"
              fullWidth
              margin="normal"
              {...register("license_plate")}
              error={errors.license_plate ? true : false}
              helperText={errors.license_plate?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(handleClick)}
            >
              Save changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
