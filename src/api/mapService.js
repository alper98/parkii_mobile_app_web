import api from "./ApiClient";
import { toast } from "react-toastify";
class MapService {
  getRestrictions = async (latitude, longitude, distance = 30) => {
    const response = await toast.promise(
      api.get("/parking/restrictions", {
        params: {
          latitude: latitude,
          longitude: longitude,
          distance: distance,
        },
      }),
      {
        pending: "Loading map...",
        success: "Loaded map!",
        error: {
          render({ data }) {
            return data.response.data.message;
          },
        },
      }
    );
    console.log(response);
    if (response.data.features.length > 0) {
      return { restrictions: response.data };
    } else {
      return false;
    }
  };
}

export default new MapService();
