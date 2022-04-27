import React, { createContext, useEffect, useState } from "react";
import LoginContainer from "./pages/login/LoginContainer";
import { isAuthenticated } from "./api/auth/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(undefined);
  const [user, setUser] = useState({
    id: 2,
    name: "Alper",
    email: "alper@test.dk",
    email_verified_at: null,
    created_at: "2022-04-27T13:13:17.000000Z",
    updated_at: "2022-04-27T13:13:17.000000Z",
    phone: null,
    car: null,
  });

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
