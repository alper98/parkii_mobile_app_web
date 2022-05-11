import api from "./ApiClient";
class MapService {
  getRestrictions = async (latitude, longitude, distance) => {
    const response = await api.get("/parking/restrictions", {
      params: {
        latitude: latitude,
        longitude: longitude,
        distance: distance * 0.001,
      },
    });
    if (response.data.features.length > 0) {
      return { restrictions: response.data };
    } else {
      return false;
    }
  };
  getRestriction = async (id) => {
    const response = await api.get(`/parking/restrictions/${id}`);
    if (response.data) {
      return { restriction: response.data };
    } else {
      return false;
    }
  };
  getZones = async () => {
    const response = await api.get("/parking/zones");
    if (response.data.features.length > 0) {
      return { zones: response.data };
    } else {
      return false;
    }
  };
}

export default new MapService();
