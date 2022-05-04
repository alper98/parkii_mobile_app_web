import api from "./ApiClient";
import { toast } from "react-toastify";
class MapService {
  getRestrictions = async (latitude, longitude, distance) => {
    const response = await toast.promise(
      api.get("/parking/restrictions", {
        params: {
          latitude: latitude,
          longitude: longitude,
          distance: distance * 0.001,
        },
      }),
      {
        error: {
          render({ data }) {
            return data.response.data.message;
          },
        },
      }
    );
    if (response.data.features.length > 0) {
      return { restrictions: response.data };
    } else {
      return false;
    }
  };
  getZones = async () => {
    const response = await toast.promise(api.get("/parking/zones"), {
      error: {
        render({ data }) {
          return data.response.data.message;
        },
      },
    });
    if (response.data.features.length > 0) {
      return { zones: response.data };
    } else {
      return false;
    }
  };
}

export default new MapService();
