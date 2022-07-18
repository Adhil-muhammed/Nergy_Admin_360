import { Routes, Route } from "react-router-dom";
import {
  AddorEditAssessmentSchedule,
  AssessmentScheduleList,
  AssessmentSlots,
  GenerateAssessmentSchedule,
} from "./containers";
const AssessmentSchedule = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AssessmentScheduleList />} />
        <Route path="/create" element={<AddorEditAssessmentSchedule />} />
        <Route path="/slots/:scheduleId" element={<AssessmentSlots />} />
        <Route path="/generate-schedule" element={<GenerateAssessmentSchedule />} />
      </Routes>
    </>
  );
};

export default AssessmentSchedule;
