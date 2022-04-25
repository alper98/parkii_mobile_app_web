import api from "../ApiClient";

export const fetchRestrictions = () => async (dispatch) => {
  const res = await api.get("/parking/restrictions");
  const data = await res.json();
  console.log(data);
  return data;
};

export const fetchZones = () => async (dispatch) => {
  const res = await api.get("/parking/zones");
  const data = await res.json();
  console.log(data);
  return data;
};
