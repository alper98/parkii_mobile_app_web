import api from "../ApiClient";
import { useMutation } from "react-query";

export const login = async (email, password) => {
  const response = await api.post("/login", {
    email,
    password,
  });
  const token = response.data.access_token;
  if (!token) {
    return false;
  }
  localStorage.setItem("access_token", token);
  return response.data.user;
};

export const register = async (name, email, password) => {
  const response = await api.post("/register", {
    name,
    email,
    password,
  });
  return response;
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return false;
  }
  const data = await api.get("/user");
  if (!data) {
    return false;
  }
  return data.data.user;
};
