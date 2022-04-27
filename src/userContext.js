import React, { createContext, useEffect, useState } from "react";
import LoginContainer from "./pages/login/LoginContainer";
import { isAuthenticated } from "./api/auth/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = await isAuthenticated();

      if (!cuser) {
        localStorage.removeItem("access_token");
        cuser = null;
        setUser(null);
      }
      setUser(cuser);
    };
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {user ? children : <LoginContainer />}
    </UserContext.Provider>
  );
};

export default UserContext;
