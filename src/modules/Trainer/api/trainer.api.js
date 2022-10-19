import { Axios } from "utils";

export const createTrainers = async (trainer) => {
  const res = await Axios.post("/Trainer", trainer);
  return res.data;
};

export const getTrainer = async (pagination) => {
  const { pageIndex, pageSize } = pagination;
  const res = await Axios.get(`/Trainer?pageNo=${pageIndex}&pageSize=${pageSize}`);
  return res.data;
};

export const updateTrainer = async (trainer) => {
  const res = await Axios.put("/Trainer", trainer);
  return res.data;
};

export const deleteTrainerById = async (trainerId) => {
  const res = await Axios.delete(`/Trainer/${trainerId}`);
  return res.data;
};

export const getTrainerById = async (id) => {
  const res = await Axios.get(`/Trainer/${id}`);
  return res.data;
};
