import { Routes, Route } from "react-router-dom";
import { AddorEditAssessmentSchedule, AssessmentScheduleList, AssessmentSlots } from "./containers";
const AssessmentSchedule = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AssessmentScheduleList />} />
        <Route path="/create" element={<AddorEditAssessmentSchedule />} />
        {/* <Route path="/edit/:scheduleId" element={<AddorEditAssessmentSchedule />} /> */}
        <Route path="/slots/:scheduleId" element={<AssessmentSlots />} />
      </Routes>
    </>
  );
};

export default AssessmentSchedule;
