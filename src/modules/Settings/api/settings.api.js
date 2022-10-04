import { Axios } from "utils";

export const getSettings = async () => {
  const res = await Axios.get("/Settings");
  return res.data;
};

export const createSettings = async (setting) => {
  const res = await Axios.post("/Settings", setting);
  return res.data;
};

export const updateSettings = async (setting) => {
  const res = await Axios.put("/Settings", setting);
  return res.data;
};

export const getSettingsById = async (key) => {
  const res = await Axios.get(`/Settings/${key}`);
  return res.data;
};
