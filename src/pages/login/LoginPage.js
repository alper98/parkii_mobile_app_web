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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = async (email, password) => {
    setIsSubmitting(true);
    const response = await AuthService.login(email, password);
    if (response.user) {
      toast.success(`Loggin in...`, {
        toastId: "loggingIn",
      });
      setTimeout(() => {
        setUser(response.user);
        navigate("/profile");
      }, 1500);
    } else {
      toast.error("Wrong credentials", {
        toastId: "wrongCredentials",
      });
    }
    setTimeout(() => {
      setIsSubmitting(false);
      toast.clearWaitingQueue();
    }, 1500);
  };

  const handleSignUp = async (data) => {
    setIsSubmitting(true);
    const response = await UserService.create(data);
    if (response.access_token) {
      const getUserResponse = await UserService.get();
      toast.success(`${getUserResponse.user.name} created!`, {
        toastId: "created",
      });
      setTimeout(() => {
        setUser(getUserResponse.user);
      }, 2300);
    } else if (response.error) {
      toast.error(response.error, {
        toastId: "Error",
      });
    }
    setTimeout(() => {
      setIsSubmitting(false);
      toast.clearWaitingQueue();
    }, 1500);
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
          isSubmitting={isSubmitting}
        />
      ) : (
        <SignUpComponent
          handleLoginSignUp={handleLoginSignUp}
          handleSignUp={handleSignUp}
          isSubmitting={isSubmitting}
        />
      )}
      <ToastContainer
        limit={1}
        position={"top-right"}
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </Grid>
  );
}
