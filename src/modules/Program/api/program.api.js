import { Axios } from "utils";

export const getPrograms = async () => {
  const res = await Axios.get("/Program");
  return res.data;
};

export const createPrograms = async (program) => {
  const res = await Axios.post("/Program", program);
  return res.data;
};

export const updatePrograms = async (program) => {
  const res = await Axios.put("/Program", program);
  return res.data;
};

export const detelePrograms = async (programId) => {
  const res = await Axios.delete(`/Program/${programId}`);
  return res.data;
};

export const getProgramById = async (programId) => {
  const res = await Axios.get(`/Program/${programId}`);
  return res.data;
};
