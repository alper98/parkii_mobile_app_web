import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthService from "../../api/authService";
import UserService from "../../api/userService";
import UserContext from "../../userContext";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

export default function LoginPage() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    const response = await AuthService.login(email, password);
    if (response.user) {
      toast.success(`Loggin in...`);
      setTimeout(() => {
        setUser(response.user);
        navigate("/profile");
      }, 1500);
    } else {
      toast.error("Wrong credentials");
    }
  };

  const handleSignUp = async (data) => {
    const response = await UserService.create(data);
    if (response.access_token) {
      const getUserResponse = await UserService.get();
      toast.success(`${getUserResponse.user.name} created!`);
      setTimeout(() => {
        setUser(getUserResponse.user);
      }, 2300);
    } else if (response.error) {
      toast.error(response.error);
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
      <ToastContainer
        limit={1}
        position={"top-right"}
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </Grid>
  );
}
