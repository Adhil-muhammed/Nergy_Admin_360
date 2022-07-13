import { Axios } from "utils";

export const getAssessmentSchedule = async () => {
  const res = await Axios.get("/AssessmentSchedule");
  return res.data;
};

export const getAssessmentScheduleById = async (id) => {
  const res = await Axios.get(`/AssessmentSchedule/assessment/${id}`);
  return res.data;
};

export const createAssessmentSchedules = async (payload) => {
  const res = await Axios.post("/AssessmentSchedule", payload);
  return res.data;
};

export const updateAssessmentSchedule = async (payload) => {
  const res = await Axios.put("/AssessmentSchedule", payload);
  return res.data;
};

export const deteleAssessmentSchedules = async (id) => {
  const res = await Axios.delete(`/AssessmentSchedule/${id}`);
  return res.data;
};
