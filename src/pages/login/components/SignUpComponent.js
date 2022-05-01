import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { validationSchema } from "../Util/validationSchema";

export default function SignUpComponent({ handleLoginSignUp, handleSignUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClick = (data) => {
    delete data.confirmPassword;
    handleSignUp(data);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign up - Parkii.dk</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleClick}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
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
              required
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
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              value={12345678}
              fullWidth
              margin="normal"
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
            />
            <TextField
              required
              value={12345678}
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirmPassword")}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(handleClick)}
            >
              Register
            </Button>
            <Grid container>
              <Grid item onClick={() => handleLoginSignUp()}>
                <Link href="#" variant="body2">
                  Already signed up? Log in here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
