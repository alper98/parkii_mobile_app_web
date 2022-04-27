import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../api/auth/authService";
import UserContext from "../../userContext";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginContainer() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [signUpMessage, setSignUpMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
    setSignUpMessage(null);
    setLoginMessage(null);
  };

  const handleLogin = async (email, password) => {
    try {
      const user = await login(email, password);
      setUser(user);
    } catch (error) {
      if (error.response.data) {
        setLoginMessage("Wrong email or password");
      }
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      await register(name, email, password);
      setSignUpMessage("Created!");
      setTimeout(() => {
        handleLoginSignUp();
      }, 1500);
    } catch (error) {
      if (error.response.data.errors.email) {
        setSignUpMessage(error.response.data.errors.email);
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
      {isLogIn ? (
        <LoginComponent
          handleLoginSignUp={handleLoginSignUp}
          handleLogin={handleLogin}
          loginMessage={loginMessage}
        />
      ) : (
        <SignUpComponent
          handleLoginSignUp={handleLoginSignUp}
          handleSignUp={handleSignUp}
          signUpMessage={signUpMessage}
        />
      )}
    </Grid>
  );
}
