import { Axios } from "utils";

export const generateSchedule = async (payload) => {
  const res = await Axios.post("/AssessmentSchedule/generate", payload);
  return res.data;
};
