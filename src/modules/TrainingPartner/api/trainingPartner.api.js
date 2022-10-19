import { Axios } from "utils";

export const getTrainingPartner = async () => {
  const res = await Axios.get("/TrainingPartner");
  return res.data;
};

export const getTrainingPartnerById = async (trainingPartnerId) => {
  const res = await Axios.get(`/TrainingPartner/${trainingPartnerId}`);
  return res.data;
};

export const createTrPartner = async (trainingpartner) => {
  const res = await Axios.post("/TrainingPartner", trainingpartner);
  return res.data;
};

export const updateTrainingPartner = async (trainingpartner) => {
  const res = await Axios.put("/TrainingPartner", trainingpartner);
  return res.data;
};

export const deleteTrPartner = async (trainingPartnerId) => {
  const res = await Axios.delete(`/TrainingPartner/${trainingPartnerId}`);
  return res.data;
};
