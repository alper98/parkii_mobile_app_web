import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import authService from "./api/authService";
import { toast, ToastContainer } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    let cuser = await authService.isTokenValid();
    if (cuser.error) {
      setUser(null);
      navigate("/login");
      toast.error("Session expired - Log in again");
    } else if (cuser) {
      setUser(cuser);
    }
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

  return (
    <UserContext.Provider value={[user, setUser]}>
      {user ? children : <LoginPage />}
      <ToastContainer
        limit={1}
        position={"top-right"}
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </UserContext.Provider>
  );
};

export default UserContext;
