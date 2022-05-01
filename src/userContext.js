import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import authService from "./api/authService";
import { toast, ToastContainer } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    let cuser = await authService.isTokenValid();
    if (cuser.error) {
      setUser(null);
      toast.error("Expired or invalid session - Log in again");
      navigate("/login");
    } else if (cuser) {
      console.log("test");
      toast.info("Session restored");
      toast.clearWaitingQueue();
      setUser(cuser);
      return;
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    function listenForStorage() {
      const token = localStorage.getItem("access_token");
      if (token) {
        checkLoggedIn();
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
        autoClose={750}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </UserContext.Provider>
  );
};

export default UserContext;
