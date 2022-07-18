import { Axios } from "utils";

export const getAllSlotsByScheduleID = async (scheduleId) => {
  const res = await Axios.get(`AssessmentSchedule/${scheduleId}/slots`);
  return res.data;
};

export const deleteAssessmentSlot = async ({ scheduleId, slotId }) => {
  console.log("deleteAssessmentSlot-api", scheduleId, slotId);
  const res = await Axios.delete(`AssessmentSchedule/${scheduleId}/slots/${slotId}`);
  return res.data;
};
