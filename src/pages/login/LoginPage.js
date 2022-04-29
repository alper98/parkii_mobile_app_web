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
    const response = await login(email, password);
    if (response.user) {
      setTypeOfAlert("success");
      setStatusMessage("Logging in");
      setTimeout(() => {
        setUser(response.user);
        navigate("/map");
      }, 1500);
    } else {
      setTypeOfAlert("error");
      setStatusMessage("Wrong credentials");
    }
  };

  const handleSignUp = async (name, email, password) => {
    const response = await register(name, email, password);
    if (response.user) {
      setTypeOfAlert("success");
      setStatusMessage("Created - Logging in");
      setTimeout(() => {
        setUser(response.user);
        navigate("/map");
      }, 1500);
    } else {
      setTypeOfAlert("error");
      setStatusMessage(response);
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
