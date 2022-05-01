import axios from "axios";
import { toast } from "react-toastify";

const endpoint =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PARKII_URL
    : "http://localhost:8000/api";

const api = axios.create({
  baseURL: endpoint,
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

export default api;
