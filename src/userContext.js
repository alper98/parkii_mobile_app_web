import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { isAuthenticated } from "./api/auth/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = await isAuthenticated();
      if (!cuser) {
        localStorage.removeItem("access_token");
        setUser(null);
        navigate("/login");
      }
      setUser(cuser);
    };
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {user ? children : <LoginPage />}
    </UserContext.Provider>
  );
};

export default UserContext;
