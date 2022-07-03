import { Axios } from "utils";

export const getBatches = async () => {
  const res = await Axios.get("/Batches");
  return res.data;
};

export const getBatchById = async (batchId) => {
  const res = await Axios.get(`/batches/${batchId}`);
  return res.data;
};

export const createBatches = async (batch) => {
  const res = await Axios.post("/Batches", batch);
  return res.data;
};

export const updateBatches = async (batch) => {
  const res = await Axios.put("/Batches", batch);
  return res.data;
};

export const deteleBatches = async (batchId) => {
  const res = await Axios.delete(`/Batches/${batchId}`);
  return res.data;
};
