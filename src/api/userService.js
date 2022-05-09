import api from "./ApiClient";

class UserService {
  get = async () => {
    if (!localStorage.getItem("access_token")) return;
    try {
      const response = await api.get(`/user`);
      return { user: response.data.user };
    } catch (error) {
      if (error.response) {
        return error.response.data.message;
      }
    }
  };

  create = async (data) => {
    const response = await api.post("/register", data);
    localStorage.setItem("access_token", response?.data?.access_token);
    return {
      access_token: response?.data?.access_token,
      user: response?.data?.user,
    };
  };

  update = async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    if (response.data.user) {
      return { user: response.data.user };
    }
  };

  delete = async (id) => {
    const response = await api.delete(`/users/${id}`);
    if (response) {
      return true;
    }
  };
}
export default new UserService();
