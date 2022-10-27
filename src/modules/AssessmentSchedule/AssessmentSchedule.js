import { Routes, Route } from "react-router-dom";
import {
  AddorEditAssessmentSchedule,
  AssessmentScheduleList,
  AssessmentSlots,
  GenerateAssessmentSchedule,
} from "./containers";
import { useAuthorizeContext } from "master";


const AssessmentSchedule = () => {
  const { hasPermission } = useAuthorizeContext();

  return (
    <>
      <Routes>
        {
          hasPermission("AssessmentSchedule", "View") &&
          <Route path="/" element={<AssessmentScheduleList />} />
        }
        {
          hasPermission("AssessmentSchedule", "Create") &&
          <Route path="/create" element={<AddorEditAssessmentSchedule />} />
        }
        <Route path="/slots/:scheduleId" element={<AssessmentSlots />} />
        <Route path="/generate-schedule" element={<GenerateAssessmentSchedule />} />
      </Routes>
    </>
  );
};

export default AssessmentSchedule;
