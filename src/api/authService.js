import api from "./ApiClient";
import { toast } from "react-toastify";

class AuthService {
  login = async (email, password) => {
    const credentials = { email, password };
    const response = await toast.promise(api.post("/login", credentials), {
      success: "Logged in!",
      error: {
        render({ data }) {
          return data.response.data.message;
        },
      },
    });
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      return { user: response.data.user };
    }
  };
  isTokenValid = async () => {
    if (!localStorage.getItem("access_token")) {
      return false;
    }
    try {
      const response = await api.get("/user");
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      localStorage.removeItem("access_token");
      return { error: "Logged out" };
    }
  };
}

export default new AuthService();
