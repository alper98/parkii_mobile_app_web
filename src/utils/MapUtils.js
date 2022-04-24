import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");

export const findAdress = (lat, lng) => {
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      let address = response.results[0].formatted_address;
      const index = address.lastIndexOf(",");
      address = address.slice(0, index);
      return address;
    },
    (error) => {
      console.error(error);
    }
  );
};
