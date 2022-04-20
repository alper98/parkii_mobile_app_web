import axios from "axios";

const endpointUrl = `https://api.parkii.dk`;

const scanSign = async (image) => {
  try {
    const splittedString = image.uri.split(",");
    const formData = new FormData();

    formData.append("image", splittedString[1]);
    formData.append("image_name", "alper");
    const ocrData = await axios.post(`${endpointUrl}/upload`, formData);
    return ocrData.data.data;
  } catch (e) {
    alert(e.message);
  }
};

const fetchData = async (
  latitude = "55.69793248361096",
  longitude = "12.530629327937127"
) => {
  try {
    const response = await fetch(
      `${endpointUrl}/signs?latitude=${latitude}&longitude=${longitude}&distance=0.195`
    );
    const json = await response.json();
    if (json.length === 0) {
      return false;
    }
    return json;
  } catch (e) {
    return false;
  }
};

export { fetchData, scanSign };
