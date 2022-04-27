import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { login, register } from "../../api/auth/authService";
import AlertComponent from "../../components/AlertComponent";
import UserContext from "../../userContext";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginContainer() {
  const [error, setError] = useState({
    error: false,
    status: null,
    message: null,
  });

  const [isLogIn, setIsLogIn] = useState(true);
  const [user, setUser] = useContext(UserContext);

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    try {
      const user = await login(email, password);
      setError((prev) => ({
        error: !prev.error,
        status: "success",
        message: "Logging in",
      }));
      setTimeout(() => {
        setUser(user);
      }, 1500);
    } catch (error) {
      if (error?.response?.data) {
        setError((prev) => ({
          error: !prev.error,
          status: "error",
          message: "Wrong credentials",
        }));
      } else {
        setError((prev) => ({
          error: !prev.error,
          status: "error",
          message: "Network error",
        }));
      }
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      await register(name, email, password);
      setError((prev) => ({
        error: !prev.error,
        status: "success",
        message: "Created - Redirecting to log in",
      }));
      setTimeout(() => {
        handleLoginSignUp();
      }, 1500);
    } catch (error) {
      if (error?.response?.data?.errors?.email) {
        setError((prev) => ({
          error: !prev.error,
          status: "error",
          message: error.response.data.errors.email,
        }));
      } else {
        setError((prev) => ({
          error: !prev.error,
          status: "error",
          message: "Network error",
        }));
      }
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      height={"100%"}
      paddingTop={10}
    >
      {error && <AlertComponent setError={setError} error={error} />}
      {isLogIn ? (
        <LoginComponent
          handleLoginSignUp={handleLoginSignUp}
          handleLogin={handleLogin}
        />
      ) : (
        <SignUpComponent
          handleLoginSignUp={handleLoginSignUp}
          handleSignUp={handleSignUp}
        />
      )}
    </Grid>
  );
}
