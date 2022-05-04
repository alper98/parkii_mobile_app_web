import Grid from "@mui/material/Grid";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/authService";
import UserService from "../../api/userService";
import UserContext from "../../userContext";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginPage() {
  const [isLogIn, setIsLogIn] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = currentUser;
  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    const response = await AuthService.login(email, password);
    if (response.user) {
      setUser(response.user);
      navigate("/profile");
    }
  };

  const handleSignUp = async (data) => {
    const response = await UserService.create(data);
    if (response.access_token) {
      const getUserResponse = await UserService.get();
      setUser(getUserResponse.user);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

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
