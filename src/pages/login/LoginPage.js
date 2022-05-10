import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, login } from "../../redux/features/userSlice";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginPage() {
  const [isLogIn, setIsLogIn] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    const user = await dispatch(login({ email, password })).unwrap();
    if (user) {
      navigate("/map");
    }
  };

  const handleSignUp = async (data) => {
    const user = await dispatch(create(data)).unwrap();
    if (user) {
      navigate("/map");
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
