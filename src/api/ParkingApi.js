import axios from "axios";

const endpointUrl = `https://api.parkii.dk/parking`;

const getAreas = async () => {
  try {
    const response = await axios.get(`${endpointUrl}/areas`);
    const json = await response.json();
    if (json.length === 0) {
      return false;
    }
    return json;
  } catch (e) {
    return false;
  }
};

const getZones = async () => {
  try {
    const response = await axios.get(`${endpointUrl}/zones`);
    const json = await response.json();
    if (json.length === 0) {
      return false;
    }
    return json;
  } catch (e) {
    return false;
  }
};

export { getAreas, getZones };
