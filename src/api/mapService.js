import api from "./ApiClient";

class MapService {
  getRestrictions = async (latitude, longitude, distance = 1) => {
    try {
      const response = await api.get("/parking/restrictions", {
        params: {
          latitude: latitude,
          longitude: longitude,
          distance: distance,
        },
      });
      if (response.data) return { restrictions: response.data };
    } catch (error) {
      if (error.response) {
        return { error: error.response.data.message };
      } else {
        console.log(error);
      }
    }
  };
  getZones = async () => {
    try {
      const response = await api.get("/parking/zones");
      if (response.data) return { zones: response.data };
    } catch (error) {
      if (error.response) {
        return { error: error.response.data.message };
      } else {
        console.log(error);
      }
    }
  };
}

export default new MapService();
