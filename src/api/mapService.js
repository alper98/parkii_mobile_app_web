import api from "./ApiClient";
import { toast } from "react-toastify";
class MapService {
  // getZones = async () => {
  //   try {
  //     const response = await api.get("/parking/zones");
  //     if (response.data) return { zones: response.data };
  //   } catch (error) {
  //     if (error.response) {
  //       return { error: error.response.data.message };
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // };
  getRestrictions = async (latitude, longitude, distance = 0.5) => {
    const response = await toast.promise(
      api.get("/parking/restrictions", {
        params: {
          latitude: latitude,
          longitude: longitude,
          distance: distance,
        },
      }),
      {
        pending: "Loading restrictions...",
        success: "Loaded restrictions!",
        error: {
          render({ data }) {
            return data.response.data.message;
          },
        },
      }
    );
    if (response.data) return { restrictions: response.data };
  };
}

export default new MapService();
