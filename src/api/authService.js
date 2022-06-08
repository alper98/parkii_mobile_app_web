import api from "./ApiClient";

class AuthService {
  login = async (email, password) => {
    const credentials = { email, password };
    try {
      const response = await api.post("/login", credentials);
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        return { user: response.data.user };
      }
    } catch (error) {
      if (error.message) {
        return { error: error.message };
      }
    }
  };
}

export default new AuthService();
