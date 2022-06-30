import { Axios } from "utils";

export const getAssessments = async () => {
  const res = await Axios.get("/Assessments");
  return res.data;
};

export const createAssessments = async (payload) => {
  const res = await Axios.post("/Assessments", payload);
  return res.data;
};

export const updateAssessments = async (payload) => {
  const res = await Axios.put("/Assessments", payload);
  return res.data;
};

export const getAssessmentById = async (id) => {
  const res = await Axios.get(`/Assessments/${id}`);
  return res.data;
};

export const deleteAssessment = async (id) => {
  const res = await Axios.delete(`/Assessments/${id}`);
  return res.data;
};
