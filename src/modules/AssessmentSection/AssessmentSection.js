import React from "react";
import { Route, Routes } from "react-router-dom";
import AssessmentSectionList from "./containers/AssessmentSectionList";
import CreateAssessmentSection from "./containers/CreateAssessmentSection";

const AssessmentSection = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AssessmentSectionList />} />
        <Route path="/create/new" element={<CreateAssessmentSection />} />
        <Route path="/edit/:id" element={<CreateAssessmentSection />} />
      </Routes>
    </>
  );
};

export default AssessmentSection;
