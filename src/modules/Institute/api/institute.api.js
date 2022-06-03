import { Axios } from "utils";

export const getInstitutes = async () => {
  const res = await Axios.get("/Institutes");
  return res.data;
};

export const createInstitutes = async (batch) => {
  const res = await Axios.post("/Institutes", batch);
  return res.data;
};

export const updateInstitutes = async (batch) => {
  const res = await Axios.put("/Institutes", batch);
  return res.data;
};

export const deteleInstitutes = async (batchId) => {
  const res = await Axios.delete(`/Institutes/${batchId}`);
  return res.data;
};
