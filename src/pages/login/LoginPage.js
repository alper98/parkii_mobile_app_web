import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { create, login } from "../../redux/features/userSlice";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginPage() {
  const [isLogIn, setIsLogIn] = useState(true);

  const dispatch = useDispatch();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    const user = await dispatch(login({ email, password })).unwrap();
  };

  const handleSignUp = async (data) => {
    const user = await dispatch(create(data)).unwrap();
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
