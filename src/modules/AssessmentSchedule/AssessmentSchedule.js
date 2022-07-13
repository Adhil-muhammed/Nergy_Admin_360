import { Routes, Route } from "react-router-dom";
import { AssessmentScheduleList } from "./containers";
import AddorEditAssessmentSchedule from "./containers/AddorEditAssessmentSchedule";

const AssessmentSchedule = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AssessmentScheduleList />} />
        <Route path="/create" element={<AddorEditAssessmentSchedule />} />
        <Route path="/edit/:id" element={<AddorEditAssessmentSchedule />} />
      </Routes>
    </>
  );
};

export default AssessmentSchedule;
