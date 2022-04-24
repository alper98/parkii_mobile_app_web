import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/features/auth/authSlice";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {
  const [isLogIn, setIsLogIn] = useState(true);
  const user = useSelector((s) => s.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSignUp = () => {
    setIsLogIn(!isLogIn);
  };

  const handleLogin = (email, password) => {
    dispatch(login(email, password));
  };

  const handleSignUp = (name, email, password) => {
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (user) {
      navigate("/map");
    }
  }, [user]);

  return (
    <>
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
    </>
  );
}
