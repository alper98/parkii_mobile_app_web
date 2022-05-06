import api from "./ApiClient";
import { toast } from "react-toastify";

class UserService {
  get = async () => {
    if (!localStorage.getItem("access_token")) return;
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
    const response = await toast.promise(api.post("/register", data), {
      success: `${data.name} has been created!`,
      error: {
        render({ data }) {
          return data.response.data.message;
        },
      },
    });
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      return { access_token: response.data.access_token };
    }
  };

  update = async (id, data) => {
    const response = await toast.promise(api.put(`/users/${id}`, data), {
      success: `Updated profile!`,
      error: {
        render({ data }) {
          return data.response.data.message;
        },
      },
    });
    if (response.data.user) {
      return { user: response.data.user };
    }
  };

  delete = async (id) => {
    const response = await toast.promise(api.delete(`/users/${id}`), {
      success: {
        render({ data }) {
          return data.data.message;
        },
      },
      error: {
        render({ data }) {
          return data.response.data.message;
        },
      },
    });
    if (response) {
      return true;
    }
  };
}
export default new UserService();
