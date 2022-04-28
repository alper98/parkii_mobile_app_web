import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../api/auth/authService";
import AlertComponent from "../../components/AlertComponent";
import UserContext from "../../userContext";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginPage() {
  const [statusMessage, setStatusMessage] = useState("");
  const [typeOfAlert, setTypeOfAlert] = useState("");
  const [isLogIn, setIsLogIn] = useState(true);

  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    try {
      const user = await login(email, password);
      setTypeOfAlert("success");
      setStatusMessage("Logging in");
      setTimeout(() => {
        setUser(user);
        navigate("/profile");
      }, 1500);
    } catch (error) {
      setTypeOfAlert("error");
      if (error?.response?.data) {
        setStatusMessage("Wrong credentials");
      } else {
        setStatusMessage("Network error");
      }
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      await register(name, email, password);
      setTypeOfAlert("success");
      setStatusMessage("Created - Redirecting to log in");
      setTimeout(() => {
        handleLoginSignUp();
      }, 1500);
    } catch (error) {
      setTypeOfAlert("error");
      if (error?.response?.data?.errors?.email) {
        setStatusMessage(error.response.data.errors.email);
      } else {
        setStatusMessage("Network error");
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
      {typeOfAlert && (
        <AlertComponent typeOfAlert={typeOfAlert} message={statusMessage} />
      )}
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
