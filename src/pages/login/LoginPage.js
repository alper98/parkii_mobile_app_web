import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/authService";
import UserService from "../../api/userService";
import { getUserLocation } from "../../redux/features/mapSlice";
import { setUser } from "../../redux/features/userSlice";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginPage() {
  const [isLogIn, setIsLogIn] = useState(true);
  const user = useSelector((s) => s.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    const response = await AuthService.login(email, password);
    if (response?.user) {
      await dispatch(setUser(response.user));
    }
  };

  const handleSignUp = async (data) => {
    const response = await UserService.create(data);
    if (response?.user) {
      await dispatch(setUser(response.user));
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (user) {
        await dispatch(getUserLocation());
        navigate("/profile");
      } else {
        navigate("/login");
      }
    }
    fetchData();
  }, [user]);

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
