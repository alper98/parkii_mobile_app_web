import api from "../ApiClient";

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    const token = response.data.access_token;
    if (!token) {
      return false;
    }
    localStorage.setItem("access_token", token);
    return { user: response.data.user };
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      console.log(error);
    }
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("access_token", response.data.access_token);
    const user = await isAuthenticated();
    return { user: user };
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      console.log(error);
    }
  }
};

export const isAuthenticated = async () => {
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
    return false;
  }
};
