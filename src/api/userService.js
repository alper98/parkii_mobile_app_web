import api from "./ApiClient";

class UserService {
  get = async () => {
    try {
      const response = await api.get(`/user`);
      return { user: response.data.user };
    } catch (error) {
      if (error.response) {
        return error.response.data.message;
      } else {
        console.log(error);
      }
    }
  };
  create = async (data) => {
    try {
      const response = await api.post("/register", data);
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        return { access_token: response.data.access_token };
      }
    } catch (error) {
      if (error.response) {
        return { error: error.response.data.message };
      } else {
        console.log(error);
      }
    }
  };
  update = async (id, data) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      if (response.data.user) {
        return { user: response.data.user, message: response.data.message };
      }
    } catch (error) {
      if (error.response) {
        return { error: error.response.data.message };
      } else {
        console.log(error);
      }
    }
  };
  delete = async (id) => {
    return api.delete(`/users/${id}`);
  };
}
export default new UserService();
