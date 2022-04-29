import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { isAuthenticated } from "./api/auth/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    let cuser = await isAuthenticated();
    if (!cuser) {
      setUser(null);
      navigate("/login");
    }
    setUser(cuser);
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    function listenForStorage() {
      const item = localStorage.getItem("access_token");
      if (item) {
        checkLoggedIn();
        setToken(item);
      }
    }

    window.addEventListener("storage", listenForStorage);
    return () => {
      window.removeEventListener("storage", listenForStorage);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("access_token", token);
  }, [token]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {user ? children : <LoginPage />}
    </UserContext.Provider>
  );
};

export default UserContext;
