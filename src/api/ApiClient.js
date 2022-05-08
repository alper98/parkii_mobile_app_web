import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/userSlice";
import { store } from "../redux/store";

const endpoint =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PARKII_URL
    : "http://localhost:8000/api";

const api = axios.create({
  baseURL: process.env.REACT_APP_PARKII_URL,
  headers: {},
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Error");
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      alert("You are not authorized");
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      toast.error("Session expired - Log in again");
      store.dispatch(setUser(null));
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export default api;
