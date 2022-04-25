import api from "../ApiClient";

export const fetchRestrictions = () => async () => {
  const res = await api.get("/parking/restrictions");
  const data = await res.json();
  console.log(data);
  return data;
};

export const fetchZones = () => async () => {
  const res = await api.get("/parking/zones");
  const data = await res.json();
  console.log(data);
  return data;
};
