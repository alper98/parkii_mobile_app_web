import api from "./ApiClient";

class AuthService {
  login = async (email, password) => {
    try {
      const credentials = { email, password };
      const response = await api.post("/login", credentials);
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        return { user: response.data.user };
      }
    } catch (error) {
      if (error.response) {
        return { error: error.response.data.message };
      } else {
        console.log(error);
      }
    }
  };
  isTokenValid = async () => {
    if (!localStorage.getItem("access_token")) {
      return false;
    }
    try {
      const response = await api.get("/user");
      if (response.data.user) {
        return response.data.user;
      }
    } catch (error) {
      localStorage.removeItem("access_token");
      return { error: "Logged out" };
    }
  };
}

export default new AuthService();
